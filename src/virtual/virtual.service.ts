import { Injectable } from '@nestjs/common';
import { Builder, By, WebDriver, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';

@Injectable()
export class VirtualService {
  private driver: WebDriver;

  // Initialize the driver
  async initDriver() {
    const options = new chrome.Options();
    options.addArguments(
      '--disable-blink-features=AutomationControlled',
      '--disable-gpu',
      '--window-size=1920x1080',
      '--incognito'
    );

    // Initialize the driver without ServiceBuilder
    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }

  // Perform Google search
  async searchGoogle(keyword: string): Promise<string[]> {
    try {
      // Initialize driver if not already initialized
      if (!this.driver) {
        await this.initDriver();
      }

      // Open Google
      await this.driver.get('https://www.google.com/?hl=en');

      // Log the current URL to ensure we are on the correct page
      const currentUrl = await this.driver.getCurrentUrl();
      console.log('Opened URL:', currentUrl);

      // Locate the search box and submit query
      const searchBox = await this.driver.wait(
        until.elementLocated(By.name('q')),
        15000
      );
      await searchBox.sendKeys(keyword);
      await searchBox.submit();

      // Wait for results to load and scroll to the bottom
      console.log('Waiting for search results...');
      await this.driver.sleep(3000);  // Add delay to ensure page load
      await this.driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
      await this.driver.sleep(3000);

      // Increase wait time and try to locate the search result links
      console.log('Waiting for result links...');
      await this.driver.wait(until.elementsLocated(By.css('a[jsname="UWckNb"]')), 50000);  // Targeting specific attribute

      // Collect links from search results
      const results = await this.driver.findElements(By.css('a[jsname="UWckNb"]'));
      const links: string[] = [];
      for (const result of results) {
        const link = await result.getAttribute('href');
        if (link) {
          links.push(link); 
        }
      }

      console.log('Found links:', links);
      return links;
    } catch (error) {
      console.error('Error:', error);
      return [];
    } finally {
      // Ensure that driver is initialized before quitting
      if (this.driver) {
        await this.driver.quit();
      }
    }
  }
}
