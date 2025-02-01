import { Injectable } from '@nestjs/common';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';

@Injectable()
export class SeleniumService {
    private driver: WebDriver;
  
    async init(): Promise<void> {
        this.driver = await new Builder().forBrowser('chrome').build();
    }

    async closeDriver(): Promise<void> {
        if (this.driver) {
          await this.driver.quit();
        }
      }
      async fillContactForm(): Promise<string> {
        try {
          await this.init();
          await this.driver?.get('https://patel-hospital.org.pk/contact');
      
          // Fill out the form fields
          await this.driver?.findElement(By.name('name')).sendKeys('John Doe');
          await this.driver?.findElement(By.name('email')).sendKeys('johndoe@example.com');
          await this.driver?.findElement(By.name('phone')).sendKeys('03152993405');
          await this.driver?.findElement(By.name('mess')).sendKeys('This is a test message.');
      
          // Wait for manual CAPTCHA input
          console.log('Please enter the CAPTCHA manually.');
          await this.driver?.sleep(10000);  // Wait for manual CAPTCHA input
      
          // Handle captcha field
          await this.driver?.findElement(By.name('captcha')).sendKeys('CAPTCHA_CODE');  // Replace with actual captcha input
      
          // Click submit
          await this.driver?.findElement(By.css('input[type="submit"]')).click();
      
          // Increase timeout and check for success message with updated selector
          await this.driver?.wait(until.elementLocated(By.css('.success-message')), 15000);  // Adjust based on your page
      
          return 'Form submitted successfully!';
        } catch (error) {
          console.error('Error submitting form:', error);
          return 'Form submission failed.';
        } finally {
          await this.closeDriver();
        }
      }

      
      
      
  }
