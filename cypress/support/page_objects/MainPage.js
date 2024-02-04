class MainPage {
  elements = {
    sourceTextArea: () => cy.get('[aria-label="Source text"]'),
    moreLanguagesBtn: () => cy.get('[aria-label="More target languages"]'),
    searchLanguagesTextArea: () =>
      cy.get('[aria-label="Search languages"][type="text"]'),
    translatedTextArea: () => cy.get("textarea"),
  }

  inputSourceText(text) {
    this.elements.sourceTextArea().type(text)
  }

  clickMoreLanguagesBtn() {
    this.elements.moreLanguagesBtn().eq(0).click();
  }

  inputTranslationLanguage(language) {
    this.elements.searchLanguagesTextArea().eq(1).type(`${language}{enter}`);
  }

  checkTranslation(translation) {
    this.elements.translatedTextArea().should("have.text", translation);
  }

  saveTranslationToFixture(translation, language) {
    this.elements
      .translatedTextArea()
      .should("have.text", translation)
      .invoke("text")
      .then((translatedText) => {
        cy.writeFile(`cypress/fixtures/${language}.json`, {
          translation: translatedText,
        });
      });
  }
}

export default MainPage;
