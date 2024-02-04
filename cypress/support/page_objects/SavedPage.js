class SavedPage {
  elements = {
    savedTranslationsBtn: () =>
      cy.get('[data-probe-id="saved_translations_footer_button"]'),
    savedTranslationsHeader: () => cy.get('[aria-label="Saved translations"]'),
    removeFromSavedBtn: () => cy.get('[aria-label="Remove from saved"]'),
    savedTranslationText: (text) => cy.get(`[data-text="${text}"]`)
    };

  clickSavedTranslationButton() {
    this.elements.savedTranslationsBtn().click();
  }

  validateSavedTranslationsHeader(){
    this.elements.savedTranslationsHeader().contains("Saved").should("be.visible");
  }

  clickFirstRemoveFromSavedButton(){
    this.elements.removeFromSavedBtn().first().click({ force: true });
  }

  validateSavedText(savedText){
    this.elements.savedTranslationText(savedText).should("exist");
  }

  validateSavedTextNotExists(savedText){
    this.elements.savedTranslationText(savedText).should("not.exist");
  }
}

export default SavedPage;
