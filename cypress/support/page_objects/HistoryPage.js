class HistoryPage {
  elements = {
    historyBtn: () =>
      cy.get('[data-probe-id="translation_history_footer_button"]'),
    historyHeader: () => cy.get('[aria-label="Translation history"]'),
    selectedTranslationLanguage: () =>
      cy.get('[aria-label="Translation from English to Korean"]'),
    savedTranslationIcon: () => cy.get('[aria-pressed="true"]'),
    clearHistoryBtn: () => cy.get('[aria-label="Clear all history"]'),
    clearedHistoryText: () => cy.get("div").contains("No past translations"),
    closeHistoryPageBtn: () => cy.get('[aria-label="Close history"]'),

};

  clickHistoryButton() {
    this.elements.historyBtn().click();
  }

  closeHistoryPage(){
    this.elements.closeHistoryPageBtn().eq(1).click();
  }

  clearHistory(){
    this.elements.clearHistoryBtn().click();
  }

  validateHistoryHeader() {
    this.elements.historyHeader().contains("History").should("be.visible");
  }

  validateSavedTranslationExists() {
    this.elements.savedTranslationIcon().should("exist");
  }

  validateClearedHistory() {
    this.elements.clearedHistoryText().should("exist");
  }

  saveFirstTranslation() {
    this.elements
      .selectedTranslationLanguage()
      .first()
      .parentsUntil('[role="list"]')
      .find("button")
      .contains("star_border")
      .click({ force: true });
  }
}

export default HistoryPage;
