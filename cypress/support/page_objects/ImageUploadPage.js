class ImageTranslationPage {
  elements = {
    imageBtn: () => cy.get('[aria-label="Image translation"]'),
    browseFilesBtn: () => cy.contains("Browse your files"),
    inputFile: () => cy.get("input[type=file]"),
    copyTextBtn: () => cy.get('[aria-label="Copy text"]'),
    downloadTranslationBtn: () => cy.get('[aria-label="Download translation"]'),
    clearImageBtn: () => cy.get('[aria-label="Clear image"]'),
    image: () => cy.get("img"),
  };

  clickImageButton() {
    this.elements.imageBtn().click();
  }

  clickBrowseFilesButton() {
    this.elements.browseFilesBtn().click({ force: true });
  }

  uploadImage(imagePath) {
    this.elements.inputFile().eq(1).selectFile(imagePath, {
      force: true,
    });
  }

  validateCopyTextButton() {
    this.elements.copyTextBtn().should("exist");
  }

  validateDownloadTranslationButton() {
    this.elements.downloadTranslationBtn().should("exist");
  }

  validateClearImageButton() {
    this.elements.clearImageBtn().should("exist");
  }

  validateImage() {
    this.elements.image().should("exist");
  }
}

export default ImageTranslationPage;
