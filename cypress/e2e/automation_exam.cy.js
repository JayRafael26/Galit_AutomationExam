import MainPage from "../support/page_objects/MainPage";
import HistoryPage from "../support/page_objects/HistoryPage";
import SavedPage from "../support/page_objects/SavedPage";
import ImageTranslationPage from "../support/page_objects/ImageUploadPage";

const mainPage = new MainPage();
const historyPage = new HistoryPage();
const savedPage = new SavedPage();
const imageTranslationPage = new ImageTranslationPage();

const email = "jtstccnt@gmail.com";
const pass = "TestAcctAutomati0n";
const languages = ["Filipino", "Dutch", "Japanese", "Korean", "French"];

describe("Galit Automation Exam - Google Translate Tests", () => {
  before(() => {
    cy.login(email, pass);
    cy.visit("/");
  });

  it("Translate text to 5 different languages and save in fixture folder", () => {
    cy.intercept("POST", "**/TranslateWebserverUi/**").as("translateText");
    const text = "Hello Firstmac Company. How are you today?";
    const translations = [
      "Hello FirstMac Company. Kamusta ka ngayong araw?",
      "Hallo FirstMac Company. Hoe gaat het vandaag met je?",
      "こんにちはFirstMac Company。 今日は元気ですか？",
      "Hello FirstMac Company. 오늘 기분이 어떠세요?",
      "Bonjour la société FirstMac. Comment allez-vous aujourd'hui?",
    ];

    mainPage.inputSourceText(text);

    for (let i = 0; i < languages.length; i++) {
      mainPage.clickMoreLanguagesBtn();
      mainPage.inputTranslationLanguage(languages[i]);

      cy.wait("@translateText").its("response.statusCode").should("equal", 200);
      mainPage.checkTranslation(translations[i]);
      mainPage.saveTranslationToFixture(translations[i], languages[i]);
    }
  });

  it("Go to History and find all your previous translation tasks:", () => {
    historyPage.clickHistoryButton();
    historyPage.validateHistoryHeader();

    for (let i = 4; i >= 0; i--) {
      cy.fixture(`${languages[i]}.json`).then((data) => {
        cy.contains(`${data["translation"]}`);
      });
    }
  });

  it("Mark one translation as Saved", () => {
    historyPage.saveFirstTranslation();
    historyPage.validateSavedTranslationExists();
    cy.get('[aria-pressed="true"]')
      .parentsUntil('[jscontroller="f1cAbe"]')
      .parent()
      .first()
      .within(() => {
        cy.get("div")
          .contains("Hello Firstmac Company. How are you today?")
          .next()
          .invoke("text")
          .then((text) => {
            cy.task("storeVal", text);
          });
      });
  });

  it("Go to saved and find the saved translation", () => {
    savedPage.clickSavedTranslationButton();
    savedPage.validateSavedTranslationsHeader();

    cy.task("getStoredVal").then((savedText) => {
      savedPage.validateSavedText(savedText);
      savedPage.clickFirstRemoveFromSavedButton();
      savedPage.validateSavedTextNotExists(savedText);
    });
  });

  it("Clear Translation History", () => {
    historyPage.clickHistoryButton();
    historyPage.validateHistoryHeader();
    historyPage.clearHistory();
    historyPage.validateClearedHistory();
  });

  it("Translate Using an Image/Text File (via upload)", () => {
    historyPage.closeHistoryPage();
    imageTranslationPage.clickImageButton();
    imageTranslationPage.clickBrowseFilesButton();
    imageTranslationPage.uploadImage(
      "/Galit_TechnicalExam/cypress/fixtures/sample_img.png"
    );

    imageTranslationPage.validateCopyTextButton();
    imageTranslationPage.validateDownloadTranslationButton();
    imageTranslationPage.validateClearImageButton();
    imageTranslationPage.validateImage();
  });
});
