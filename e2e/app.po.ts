import { browser, element, by } from 'protractor';

export class MyInzPage {
  navigateTo() {
    return browser.get('/');
  }
  navigateToLog() {
    return browser.get('/auth/signin');
  }

  navigateToHome() {
  	return browser.get('/home');
  }
  getInputsLogin() {
 	  var emailField = element(by.id('email'));
    var userPassField = element(by.id('password'));
    emailField.sendKeys('example@gmail.com');
    userPassField.sendKeys('secret');
  }  

  getLogin() {
  	return element(by.css('#login'));
  }
      
}
