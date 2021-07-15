import user from '../fixtures/user.json'

describe('正常系のテスト', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('uid', 'access-token', 'client')
  })
  
  it('テストができる状態である', () => {
    expect(true).to.equal(true)
  })
  
  it('ユーザー登録ページを開くことができる', () => {
    cy.visit('/sign_up')
  })

  it('「ユーザー作成」という文言が表示されている', () => {
    cy.contains('ユーザー作成').should('exist')
  })

  it('メールアドレスが入力ができる', () => {
    cy.get('input[name="email"]').type(user.email);
  })

  it('名前が入力ができる', () => {
    cy.get('input[name="username"]').type(user.name);
  })

  it('パスワードが入力ができる', () => {
    cy.get('input[name="password"]').type(user.password);
  })

  it('新規ユーザー作成ができる', () => {
    cy.contains('新規ユーザー作成').click();
  })

  it('新規ユーザー登録後、キャンバス作成画面に遷移する', () => {
    cy.url().should('include', '/canvases/new')
  })

  it('ヘッダーにユーザー名が表示されている', () => {
    cy.get('span[id="userName"]').should('have.text', user.name)
  })

  it('キャンバス新規画面に「キャンバス新規作成」の文言が表示されている', () => {
    cy.contains('キャンバス新規作成').should('exist')
  })

  it('名前が入力ができる', () => {
    cy.get('input[name="name"]').type('テストキャンバス');
  })

  it('キャンバスを作成することができる', () => {
    cy.get('button[name="createCanvas"]').click();
  })

  it('キャンバス詳細画面に「仮説キャンバス」の文言が表示されている', () => {
    cy.contains('仮説キャンバス').should('exist')
  })

  // TODO:ラベルを作成できるように

  it('サイドーバーに設定ボタンがある', () => {
    cy.contains('設定').should('exist')
  })

  it('サイドーバーにメンバーボタンがある', () => {
    cy.contains('メンバー').should('exist')
  })

  it('サイドーバーの設定ボタンをclickすると設定画面に遷移する', () => {
    cy.contains('設定').click()
  })

  it('サイドーバーの設定ボタンをclickすると設定画面に遷移する', () => {
    cy.contains('設定').click()
  })

  it('新規ユーザー登録後、キャンバス作成画面に遷移する', () => {
    cy.url().should('include', '/settings')
  })

  it('キャンバス名がキャンバス更新入力欄に入力されている', () => {
    cy.get('input').should('have.value', 'テストキャンバス')
  })

  it('キャンバス更新入力欄に入力できる', () => {
    cy.get('input').type('更新済み')
  })

  it('キャンバス名を変更することができる', () => {
    cy.get('button[id="updateLabelTitle"]').click()
  })

  it('ヘッダーにあるキャンバス名が更新したキャンバス名に変更されている', () => {
    cy.get('span[id="canvasTitle"]').should('have.text', 'テストキャンバス更新済み')
  })

  it('キャンバスを削除できる', () => {
    cy.contains('キャンバスを削除').click()
  })

  // TODO:ログアウトできるように

})