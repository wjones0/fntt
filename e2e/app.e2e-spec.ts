import { FnttPage } from './app.po';

describe('fntt App', () => {
  let page: FnttPage;

  beforeEach(() => {
    page = new FnttPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
