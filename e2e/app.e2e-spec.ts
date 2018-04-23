import { MyInzPage } from './app.po';

describe('my-inz App', () => {
  let page: MyInzPage;

  beforeEach(() => {
    page = new MyInzPage();
  });

   it('should login', () => {
    page.navigateTo();
    page.getInputsLogin();
    page.getLogin().click();
  });

});
