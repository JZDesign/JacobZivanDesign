if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'JacobZivanDesign'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'JacobZivanDesign'.");
}
var JacobZivanDesign = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwCCE = Kotlin.throwCCE;
  var addClass = Kotlin.kotlin.dom.addClass_hhb33f$;
  var Unit = Kotlin.kotlin.Unit;
  var removeClass = Kotlin.kotlin.dom.removeClass_hhb33f$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var hasClass = Kotlin.kotlin.dom.hasClass_46n0ku$;
  var asList = Kotlin.org.w3c.dom.asList_kt9thq$;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  AlbumArt.prototype = Object.create(Enum.prototype);
  AlbumArt.prototype.constructor = AlbumArt;
  BusinessCardsLandscape.prototype = Object.create(Enum.prototype);
  BusinessCardsLandscape.prototype.constructor = BusinessCardsLandscape;
  BusinessCardsPortrait.prototype = Object.create(Enum.prototype);
  BusinessCardsPortrait.prototype.constructor = BusinessCardsPortrait;
  Logos.prototype = Object.create(Enum.prototype);
  Logos.prototype.constructor = Logos;
  MobileApp$MobileAppImages.prototype = Object.create(Enum.prototype);
  MobileApp$MobileAppImages.prototype.constructor = MobileApp$MobileAppImages;
  MobileApp$IpadAppImages.prototype = Object.create(Enum.prototype);
  MobileApp$IpadAppImages.prototype.constructor = MobileApp$IpadAppImages;
  function Card(container, card, image) {
    if (container === void 0)
      container = div();
    if (card === void 0)
      card = div();
    if (image === void 0)
      image = img();
    this.container = container;
    this.card = card;
    this.image = image;
  }
  Card.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Card',
    interfaces: []
  };
  Card.prototype.component1 = function () {
    return this.container;
  };
  Card.prototype.component2 = function () {
    return this.card;
  };
  Card.prototype.component3 = function () {
    return this.image;
  };
  Card.prototype.copy_mfsbux$ = function (container, card, image) {
    return new Card(container === void 0 ? this.container : container, card === void 0 ? this.card : card, image === void 0 ? this.image : image);
  };
  Card.prototype.toString = function () {
    return 'Card(container=' + Kotlin.toString(this.container) + (', card=' + Kotlin.toString(this.card)) + (', image=' + Kotlin.toString(this.image)) + ')';
  };
  Card.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.container) | 0;
    result = result * 31 + Kotlin.hashCode(this.card) | 0;
    result = result * 31 + Kotlin.hashCode(this.image) | 0;
    return result;
  };
  Card.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.container, other.container) && Kotlin.equals(this.card, other.card) && Kotlin.equals(this.image, other.image)))));
  };
  var DIV;
  var IMG;
  var BUTTON;
  var INPUT;
  var CLICK;
  var LOGOS_AND_CARDS;
  var IMAGES;
  var ART;
  var MOBILE;
  var JPG;
  var PNG;
  var MINIMIZE;
  var HIDE;
  var SHOW;
  var INDEX;
  var MOBILE_PORTFOLIO;
  var MOBILE_PORTFOLIO_TARGET;
  var PORTFOLIO;
  var HOME;
  var ART_CARD;
  var MOBILE_CARD;
  var IS_ACTIVE;
  var IS_VISIBLE;
  var INVISIBLE;
  var FOOTER_HOME;
  var FOOTER_ART;
  var red;
  var yellow;
  var blue;
  function a() {
    var tmp$;
    return Kotlin.isType(tmp$ = document.createElement('a'), HTMLAnchorElement) ? tmp$ : throwCCE();
  }
  function div() {
    var tmp$;
    return Kotlin.isType(tmp$ = document.createElement(DIV), HTMLDivElement) ? tmp$ : throwCCE();
  }
  function img() {
    var tmp$;
    return Kotlin.isType(tmp$ = document.createElement(IMG), HTMLImageElement) ? tmp$ : throwCCE();
  }
  function input() {
    var tmp$;
    return Kotlin.isType(tmp$ = document.createElement(INPUT), HTMLInputElement) ? tmp$ : throwCCE();
  }
  function button() {
    var tmp$;
    return Kotlin.isType(tmp$ = document.createElement(BUTTON), HTMLButtonElement) ? tmp$ : throwCCE();
  }
  function hamburger() {
    return getElement('hamburger');
  }
  function navItems() {
    return getElement('nav_items');
  }
  function home() {
    return getElement(HOME);
  }
  function footerHome() {
    return getElement(FOOTER_HOME);
  }
  function footerArt() {
    return getElement(FOOTER_ART);
  }
  function art() {
    return getElement(ART_CARD);
  }
  function mobile() {
    return getElement(MOBILE_CARD);
  }
  function albumArt() {
    return getElement('album_art');
  }
  function cards() {
    return getElement('cards_landscape');
  }
  function cardsPortrait() {
    return getElement('cards_portrait');
  }
  function logos() {
    return getElement('logos');
  }
  function portfolio() {
    return getElement(PORTFOLIO);
  }
  function mobilePortfolio() {
    return getElement(MOBILE_PORTFOLIO);
  }
  function mobilePortfolioTarget() {
    return getElement(MOBILE_PORTFOLIO_TARGET);
  }
  function index() {
    return getElement(INDEX);
  }
  function getElement(string) {
    var tmp$;
    return Kotlin.isType(tmp$ = document.getElementById(string), HTMLElement) ? tmp$ : null;
  }
  function configureInput($receiver, classes, placeholder) {
    addClass($receiver, classes.slice());
    if (placeholder != null) {
      $receiver.placeholder = placeholder;
    }
  }
  function show($receiver) {
    removeClass($receiver, [HIDE, MINIMIZE]);
    addClass($receiver, [SHOW]);
    return $receiver;
  }
  function hide($receiver) {
    removeClass($receiver, [SHOW]);
    addClass($receiver, [HIDE, MINIMIZE]);
    return $receiver;
  }
  function defenestrate($receiver) {
    while ($receiver.firstChild != null) {
      $receiver.removeChild(ensureNotNull($receiver.firstChild));
    }
    return $receiver;
  }
  function buildCard($receiver, containerClasses, withBackground, imageURL) {
    addClass($receiver.container, containerClasses.slice());
    addClass($receiver.card, ['Card-body', 'shaded']);
    if (withBackground)
      addClass($receiver.card, [background()]);
    $receiver.image.src = imageURL;
    $receiver.card.append($receiver.image);
    $receiver.container.append($receiver.card);
    return $receiver;
  }
  var Random = Kotlin.kotlin.random.Random;
  var random = Kotlin.kotlin.collections.random_lj338n$;
  function background() {
    return random(red.concat(blue, blue, blue, blue, blue, yellow), Random.Default);
  }
  function main$lambda$lambda$lambda$lambda(it) {
    viewArt();
    return Unit;
  }
  function main$lambda$lambda$lambda$lambda_0(it) {
    viewMobile();
    return Unit;
  }
  function main(args) {
    (new Navigation()).setUpHamburger();
    var work = getElement('portfolio_work_space');
    var $receiver = a();
    $receiver.href = '#';
    $receiver.innerHTML = 'Design and Art';
    addClass($receiver, ['hover']);
    var it = new Card();
    var image = AlbumArt$SB_THE_FUSE_INSIDE_getInstance();
    buildCard(it, ['Card', 'Card-art'], true, image.value);
    it.container.addEventListener('click', main$lambda$lambda$lambda$lambda);
    $receiver.appendChild(it.container);
    var art = $receiver;
    var $receiver_0 = a();
    $receiver_0.href = '#';
    $receiver_0.innerHTML = 'Mobile Applications';
    addClass($receiver_0, ['hover']);
    var it_0 = new Card();
    var image_0 = MobileApp_getInstance().WY_ART;
    buildCard(it_0, ['Card', 'Card-art'], true, image_0);
    it_0.container.addEventListener('click', main$lambda$lambda$lambda$lambda_0);
    $receiver_0.appendChild(it_0.container);
    var mobile = $receiver_0;
    work != null ? (work.append(art, mobile), Unit) : null;
  }
  function NameAndEmail(container, firstNameInput, lastNameInput, emailInput, sumbit) {
    this.container = container;
    this.firstNameInput = firstNameInput;
    this.lastNameInput = lastNameInput;
    this.emailInput = emailInput;
    this.sumbit = sumbit;
  }
  NameAndEmail.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'NameAndEmail',
    interfaces: []
  };
  NameAndEmail.prototype.component1 = function () {
    return this.container;
  };
  NameAndEmail.prototype.component2 = function () {
    return this.firstNameInput;
  };
  NameAndEmail.prototype.component3 = function () {
    return this.lastNameInput;
  };
  NameAndEmail.prototype.component4 = function () {
    return this.emailInput;
  };
  NameAndEmail.prototype.component5 = function () {
    return this.sumbit;
  };
  NameAndEmail.prototype.copy_eoqgyf$ = function (container, firstNameInput, lastNameInput, emailInput, sumbit) {
    return new NameAndEmail(container === void 0 ? this.container : container, firstNameInput === void 0 ? this.firstNameInput : firstNameInput, lastNameInput === void 0 ? this.lastNameInput : lastNameInput, emailInput === void 0 ? this.emailInput : emailInput, sumbit === void 0 ? this.sumbit : sumbit);
  };
  NameAndEmail.prototype.toString = function () {
    return 'NameAndEmail(container=' + Kotlin.toString(this.container) + (', firstNameInput=' + Kotlin.toString(this.firstNameInput)) + (', lastNameInput=' + Kotlin.toString(this.lastNameInput)) + (', emailInput=' + Kotlin.toString(this.emailInput)) + (', sumbit=' + Kotlin.toString(this.sumbit)) + ')';
  };
  NameAndEmail.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.container) | 0;
    result = result * 31 + Kotlin.hashCode(this.firstNameInput) | 0;
    result = result * 31 + Kotlin.hashCode(this.lastNameInput) | 0;
    result = result * 31 + Kotlin.hashCode(this.emailInput) | 0;
    result = result * 31 + Kotlin.hashCode(this.sumbit) | 0;
    return result;
  };
  NameAndEmail.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.container, other.container) && Kotlin.equals(this.firstNameInput, other.firstNameInput) && Kotlin.equals(this.lastNameInput, other.lastNameInput) && Kotlin.equals(this.emailInput, other.emailInput) && Kotlin.equals(this.sumbit, other.sumbit)))));
  };
  function Navigation() {
  }
  Navigation.prototype.toggleNavigationVisibility_0 = function () {
    var tmp$;
    var tmp$_0;
    if ((tmp$ = navItems()) != null) {
      if (hasClass(tmp$, IS_VISIBLE)) {
        removeClass(tmp$, [IS_VISIBLE]);
        addClass(tmp$, [INVISIBLE]);
      }
       else {
        addClass(tmp$, [IS_VISIBLE]);
        removeClass(tmp$, [INVISIBLE]);
      }
      tmp$_0 = tmp$;
    }
     else
      tmp$_0 = null;
    return tmp$_0;
  };
  function Navigation$getAllNavElements$lambda$lambda(it) {
    goHome();
    return Unit;
  }
  function Navigation$getAllNavElements$lambda$lambda_0(it) {
    viewArt();
    return Unit;
  }
  function Navigation$getAllNavElements$lambda$lambda_1(it) {
    viewMobile();
    return Unit;
  }
  Navigation.prototype.getAllNavElements = function () {
    var tmp$;
    tmp$ = asList(document.querySelectorAll("[data-nav='home']")).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.addEventListener('click', Navigation$getAllNavElements$lambda$lambda);
    }
    var tmp$_0;
    tmp$_0 = asList(document.querySelectorAll("[data-nav='art']")).iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      element_0.addEventListener('click', Navigation$getAllNavElements$lambda$lambda_0);
    }
    var tmp$_1;
    tmp$_1 = asList(document.querySelectorAll("[data-nav='mobile']")).iterator();
    while (tmp$_1.hasNext()) {
      var element_1 = tmp$_1.next();
      element_1.addEventListener('click', Navigation$getAllNavElements$lambda$lambda_1);
    }
  };
  function Navigation$setUpHamburger$lambda$lambda(this$, this$Navigation) {
    return function (it) {
      if (hasClass(this$, IS_ACTIVE))
        removeClass(this$, [IS_ACTIVE]);
      else
        addClass(this$, [IS_ACTIVE]);
      this$Navigation.toggleNavigationVisibility_0();
      return Unit;
    };
  }
  Navigation.prototype.setUpHamburger = function () {
    var tmp$;
    var tmp$_0;
    if ((tmp$ = hamburger()) != null) {
      this.getAllNavElements();
      tmp$.addEventListener('click', Navigation$setUpHamburger$lambda$lambda(tmp$, this));
      tmp$_0 = tmp$;
    }
     else
      tmp$_0 = null;
    return tmp$_0;
  };
  Navigation.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Navigation',
    interfaces: []
  };
  function goHome() {
    var tmp$, tmp$_0, tmp$_1;
    (tmp$ = portfolio()) != null ? hide(tmp$) : null;
    (tmp$_0 = mobilePortfolio()) != null ? hide(tmp$_0) : null;
    destroyPortfolio();
    (tmp$_1 = index()) != null ? show(tmp$_1) : null;
  }
  function viewArt() {
    var tmp$, tmp$_0, tmp$_1;
    (tmp$ = index()) != null ? hide(tmp$) : null;
    (tmp$_0 = mobilePortfolio()) != null ? hide(tmp$_0) : null;
    destroyPortfolio();
    showPortfolioItems();
    (tmp$_1 = portfolio()) != null ? show(tmp$_1) : null;
  }
  function viewMobile() {
    var tmp$, tmp$_0, tmp$_1;
    (tmp$ = index()) != null ? hide(tmp$) : null;
    (tmp$_0 = portfolio()) != null ? hide(tmp$_0) : null;
    destroyPortfolio();
    (tmp$_1 = mobilePortfolio()) != null ? show(tmp$_1) : null;
    showMobileItems();
  }
  function destroyPortfolio() {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    (tmp$ = albumArt()) != null ? defenestrate(tmp$) : null;
    (tmp$_0 = cards()) != null ? defenestrate(tmp$_0) : null;
    (tmp$_1 = cardsPortrait()) != null ? defenestrate(tmp$_1) : null;
    (tmp$_2 = logos()) != null ? defenestrate(tmp$_2) : null;
    (tmp$_3 = mobilePortfolioTarget()) != null ? defenestrate(tmp$_3) : null;
  }
  function showMobileItems() {
    var tmp$, tmp$_0;
    (tmp$ = mobilePortfolioTarget()) != null ? tmp$.appendChild(headerWithText('Mobile Applications')) : null;
    var $receiver = MobileApp$MobileAppImages$values();
    var tmp$_1;
    for (tmp$_1 = 0; tmp$_1 !== $receiver.length; ++tmp$_1) {
      var element = $receiver[tmp$_1];
      var tmp$_2;
      if ((tmp$_2 = mobilePortfolioTarget()) != null) {
        var card = new Card();
        buildCard(card, ['Card', 'Card-art'], true, element.value);
        tmp$_2.appendChild(card.container);
      }
    }
    (tmp$_0 = mobilePortfolioTarget()) != null ? tmp$_0.appendChild(headerWithText('Ipad App')) : null;
    var $receiver_0 = MobileApp$IpadAppImages$values();
    var tmp$_3;
    for (tmp$_3 = 0; tmp$_3 !== $receiver_0.length; ++tmp$_3) {
      var element_0 = $receiver_0[tmp$_3];
      var tmp$_4;
      if ((tmp$_4 = mobilePortfolioTarget()) != null) {
        var card_0 = new Card();
        buildCard(card_0, ['Card', 'Card-art'], true, element_0.value);
        tmp$_4.appendChild(card_0.container);
      }
    }
  }
  function showPortfolioItems() {
    var tmp$, tmp$_0;
    (tmp$ = albumArt()) != null ? tmp$.appendChild(headerWithText('Album Art')) : null;
    var $receiver = AlbumArt$values();
    var tmp$_1;
    for (tmp$_1 = 0; tmp$_1 !== $receiver.length; ++tmp$_1) {
      var element = $receiver[tmp$_1];
      var tmp$_2;
      if ((tmp$_2 = albumArt()) != null) {
        var album_art = new Card();
        buildCard(album_art, ['Card', 'Card-albumArt'], true, element.value);
        tmp$_2.appendChild(album_art.container);
      }
    }
    (tmp$_0 = cards()) != null ? tmp$_0.appendChild(headerWithText('Business Cards & Logo Design')) : null;
    var $receiver_0 = BusinessCardsLandscape$values();
    var tmp$_3;
    for (tmp$_3 = 0; tmp$_3 !== $receiver_0.length; ++tmp$_3) {
      var element_0 = $receiver_0[tmp$_3];
      var tmp$_4;
      if ((tmp$_4 = cards()) != null) {
        var bizCard = new Card();
        buildCard(bizCard, ['Card', 'Card-businessCards', 'Card-businessCards--landscape'], true, element_0.value);
        tmp$_4.appendChild(bizCard.container);
      }
    }
    var $receiver_1 = BusinessCardsPortrait$values();
    var tmp$_5;
    for (tmp$_5 = 0; tmp$_5 !== $receiver_1.length; ++tmp$_5) {
      var element_1 = $receiver_1[tmp$_5];
      var tmp$_6;
      if ((tmp$_6 = cardsPortrait()) != null) {
        var bizCard_0 = new Card();
        buildCard(bizCard_0, ['Card', 'Card-businessCards', 'Card-businessCards--portrait'], true, element_1.value);
        tmp$_6.appendChild(bizCard_0.container);
      }
    }
    var $receiver_2 = Logos$values();
    var tmp$_7;
    for (tmp$_7 = 0; tmp$_7 !== $receiver_2.length; ++tmp$_7) {
      var element_2 = $receiver_2[tmp$_7];
      var tmp$_8;
      if ((tmp$_8 = logos()) != null) {
        var logo = new Card();
        buildCard(logo, ['Card', 'Card-art'], false, element_2.value);
        tmp$_8.appendChild(logo.container);
      }
    }
  }
  function headerWithText(text) {
    var $receiver = document.createElement('h1');
    $receiver.innerHTML = text;
    addClass($receiver, ['Portfolio-title', 'shaded', 'Space-small']);
    return $receiver;
  }
  function View() {
    var tmp$;
    this.container_0 = Kotlin.isType(tmp$ = document.getElementById('formContainer'), HTMLDivElement) ? tmp$ : throwCCE();
  }
  View.prototype.create = function () {
  };
  function View$newForm$lambda$lambda$lambda$lambda(this$) {
    return function (it) {
      window.alert('This form and button were dynamically created with Kotlin\n\nYour name is: ' + (this$.firstNameInput.value + ' ' + this$.lastNameInput.value + '\n' + '\n' + ' and your email is: ' + this$.emailInput.value));
      return Unit;
    };
  }
  View.prototype.newForm_0 = function () {
    var form = new NameAndEmail(div(), input(), input(), input(), button());
    configureInput(form.firstNameInput, [INPUT], 'First Name');
    configureInput(form.lastNameInput, [INPUT], 'Last Name');
    configureInput(form.emailInput, [INPUT], 'Email');
    var $receiver = form.sumbit;
    addClass($receiver, [BUTTON]);
    $receiver.innerHTML = 'Submit';
    $receiver.addEventListener(CLICK, View$newForm$lambda$lambda$lambda$lambda(form));
    var $receiver_0 = form.container;
    addClass($receiver_0, ['container']);
    $receiver_0.append(form.firstNameInput, form.lastNameInput, form.emailInput, form.sumbit);
    return form.container;
  };
  View.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'View',
    interfaces: []
  };
  function AlbumArt(name, ordinal, value) {
    Enum.call(this);
    this.value = value;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function AlbumArt_initFields() {
    AlbumArt_initFields = function () {
    };
    AlbumArt$SB_BLIND_instance = new AlbumArt('SB_BLIND', 0, 'images/art/' + 'blind.jpg');
    AlbumArt$SB_EOS_instance = new AlbumArt('SB_EOS', 1, 'images/art/' + 'eos.jpg');
    AlbumArt$SB_EOS_BANDPHOTO_instance = new AlbumArt('SB_EOS_BANDPHOTO', 2, 'images/art/' + 'eosbandphoto.jpg');
    AlbumArt$SB_THE_FUSE_INSIDE_instance = new AlbumArt('SB_THE_FUSE_INSIDE', 3, 'images/art/' + 'thefuseinside.jpg');
    AlbumArt$SB_THE_FUSE_INSIDE_BACK_instance = new AlbumArt('SB_THE_FUSE_INSIDE_BACK', 4, 'images/art/' + 'thefuseback.jpg');
    AlbumArt$SB_ANGLES_instance = new AlbumArt('SB_ANGLES', 5, 'images/art/' + 'angles.jpg');
    AlbumArt$SB_DEVILS_WING_instance = new AlbumArt('SB_DEVILS_WING', 6, 'images/art/' + 'devilswing.jpg');
    AlbumArt$SB_I_AM_THE_HORIZON_instance = new AlbumArt('SB_I_AM_THE_HORIZON', 7, 'images/art/' + 'iamthehorizon.jpg');
    AlbumArt$SB_LOGO_instance = new AlbumArt('SB_LOGO', 8, 'images/art/' + 'sblogo2017.jpg');
    AlbumArt$SB_LOGO_OLD_instance = new AlbumArt('SB_LOGO_OLD', 9, 'images/art/' + 'slowburnlogo.jpg');
    AlbumArt$SB_FLAME_LOGO_instance = new AlbumArt('SB_FLAME_LOGO', 10, 'images/art/' + 'flamesLogo.jpg');
    AlbumArt$SB_DRUMHEAD_instance = new AlbumArt('SB_DRUMHEAD', 11, 'images/art/' + 'drumhead.jpg');
    AlbumArt$SB_TIDAL_WAVE_instance = new AlbumArt('SB_TIDAL_WAVE', 12, 'images/art/' + 'TidalWave.jpg');
  }
  var AlbumArt$SB_BLIND_instance;
  function AlbumArt$SB_BLIND_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_BLIND_instance;
  }
  var AlbumArt$SB_EOS_instance;
  function AlbumArt$SB_EOS_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_EOS_instance;
  }
  var AlbumArt$SB_EOS_BANDPHOTO_instance;
  function AlbumArt$SB_EOS_BANDPHOTO_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_EOS_BANDPHOTO_instance;
  }
  var AlbumArt$SB_THE_FUSE_INSIDE_instance;
  function AlbumArt$SB_THE_FUSE_INSIDE_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_THE_FUSE_INSIDE_instance;
  }
  var AlbumArt$SB_THE_FUSE_INSIDE_BACK_instance;
  function AlbumArt$SB_THE_FUSE_INSIDE_BACK_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_THE_FUSE_INSIDE_BACK_instance;
  }
  var AlbumArt$SB_ANGLES_instance;
  function AlbumArt$SB_ANGLES_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_ANGLES_instance;
  }
  var AlbumArt$SB_DEVILS_WING_instance;
  function AlbumArt$SB_DEVILS_WING_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_DEVILS_WING_instance;
  }
  var AlbumArt$SB_I_AM_THE_HORIZON_instance;
  function AlbumArt$SB_I_AM_THE_HORIZON_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_I_AM_THE_HORIZON_instance;
  }
  var AlbumArt$SB_LOGO_instance;
  function AlbumArt$SB_LOGO_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_LOGO_instance;
  }
  var AlbumArt$SB_LOGO_OLD_instance;
  function AlbumArt$SB_LOGO_OLD_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_LOGO_OLD_instance;
  }
  var AlbumArt$SB_FLAME_LOGO_instance;
  function AlbumArt$SB_FLAME_LOGO_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_FLAME_LOGO_instance;
  }
  var AlbumArt$SB_DRUMHEAD_instance;
  function AlbumArt$SB_DRUMHEAD_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_DRUMHEAD_instance;
  }
  var AlbumArt$SB_TIDAL_WAVE_instance;
  function AlbumArt$SB_TIDAL_WAVE_getInstance() {
    AlbumArt_initFields();
    return AlbumArt$SB_TIDAL_WAVE_instance;
  }
  AlbumArt.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlbumArt',
    interfaces: [Enum]
  };
  function AlbumArt$values() {
    return [AlbumArt$SB_BLIND_getInstance(), AlbumArt$SB_EOS_getInstance(), AlbumArt$SB_EOS_BANDPHOTO_getInstance(), AlbumArt$SB_THE_FUSE_INSIDE_getInstance(), AlbumArt$SB_THE_FUSE_INSIDE_BACK_getInstance(), AlbumArt$SB_ANGLES_getInstance(), AlbumArt$SB_DEVILS_WING_getInstance(), AlbumArt$SB_I_AM_THE_HORIZON_getInstance(), AlbumArt$SB_LOGO_getInstance(), AlbumArt$SB_LOGO_OLD_getInstance(), AlbumArt$SB_FLAME_LOGO_getInstance(), AlbumArt$SB_DRUMHEAD_getInstance(), AlbumArt$SB_TIDAL_WAVE_getInstance()];
  }
  AlbumArt.values = AlbumArt$values;
  function AlbumArt$valueOf(name) {
    switch (name) {
      case 'SB_BLIND':
        return AlbumArt$SB_BLIND_getInstance();
      case 'SB_EOS':
        return AlbumArt$SB_EOS_getInstance();
      case 'SB_EOS_BANDPHOTO':
        return AlbumArt$SB_EOS_BANDPHOTO_getInstance();
      case 'SB_THE_FUSE_INSIDE':
        return AlbumArt$SB_THE_FUSE_INSIDE_getInstance();
      case 'SB_THE_FUSE_INSIDE_BACK':
        return AlbumArt$SB_THE_FUSE_INSIDE_BACK_getInstance();
      case 'SB_ANGLES':
        return AlbumArt$SB_ANGLES_getInstance();
      case 'SB_DEVILS_WING':
        return AlbumArt$SB_DEVILS_WING_getInstance();
      case 'SB_I_AM_THE_HORIZON':
        return AlbumArt$SB_I_AM_THE_HORIZON_getInstance();
      case 'SB_LOGO':
        return AlbumArt$SB_LOGO_getInstance();
      case 'SB_LOGO_OLD':
        return AlbumArt$SB_LOGO_OLD_getInstance();
      case 'SB_FLAME_LOGO':
        return AlbumArt$SB_FLAME_LOGO_getInstance();
      case 'SB_DRUMHEAD':
        return AlbumArt$SB_DRUMHEAD_getInstance();
      case 'SB_TIDAL_WAVE':
        return AlbumArt$SB_TIDAL_WAVE_getInstance();
      default:throwISE('No enum constant image_path.AlbumArt.' + name);
    }
  }
  AlbumArt.valueOf_61zpoe$ = AlbumArt$valueOf;
  function BusinessCardsLandscape(name, ordinal, value) {
    Enum.call(this);
    this.value = value;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function BusinessCardsLandscape_initFields() {
    BusinessCardsLandscape_initFields = function () {
    };
    BusinessCardsLandscape$CARD_RT_instance = new BusinessCardsLandscape('CARD_RT', 0, 'images/art/logos_and_cards/' + 'RT.jpg');
    BusinessCardsLandscape$CARD_RT_BACK_instance = new BusinessCardsLandscape('CARD_RT_BACK', 1, 'images/art/logos_and_cards/' + 'reshkusCardBack.jpg');
  }
  var BusinessCardsLandscape$CARD_RT_instance;
  function BusinessCardsLandscape$CARD_RT_getInstance() {
    BusinessCardsLandscape_initFields();
    return BusinessCardsLandscape$CARD_RT_instance;
  }
  var BusinessCardsLandscape$CARD_RT_BACK_instance;
  function BusinessCardsLandscape$CARD_RT_BACK_getInstance() {
    BusinessCardsLandscape_initFields();
    return BusinessCardsLandscape$CARD_RT_BACK_instance;
  }
  BusinessCardsLandscape.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BusinessCardsLandscape',
    interfaces: [Enum]
  };
  function BusinessCardsLandscape$values() {
    return [BusinessCardsLandscape$CARD_RT_getInstance(), BusinessCardsLandscape$CARD_RT_BACK_getInstance()];
  }
  BusinessCardsLandscape.values = BusinessCardsLandscape$values;
  function BusinessCardsLandscape$valueOf(name) {
    switch (name) {
      case 'CARD_RT':
        return BusinessCardsLandscape$CARD_RT_getInstance();
      case 'CARD_RT_BACK':
        return BusinessCardsLandscape$CARD_RT_BACK_getInstance();
      default:throwISE('No enum constant image_path.BusinessCardsLandscape.' + name);
    }
  }
  BusinessCardsLandscape.valueOf_61zpoe$ = BusinessCardsLandscape$valueOf;
  function BusinessCardsPortrait(name, ordinal, value) {
    Enum.call(this);
    this.value = value;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function BusinessCardsPortrait_initFields() {
    BusinessCardsPortrait_initFields = function () {
    };
    BusinessCardsPortrait$CARD_TRIFORCE_instance = new BusinessCardsPortrait('CARD_TRIFORCE', 0, 'images/art/logos_and_cards/' + 'Triforce.jpg');
    BusinessCardsPortrait$CARD_TRIFORCE_BACK_instance = new BusinessCardsPortrait('CARD_TRIFORCE_BACK', 1, 'images/art/logos_and_cards/' + 'TriforceBack2.jpg');
  }
  var BusinessCardsPortrait$CARD_TRIFORCE_instance;
  function BusinessCardsPortrait$CARD_TRIFORCE_getInstance() {
    BusinessCardsPortrait_initFields();
    return BusinessCardsPortrait$CARD_TRIFORCE_instance;
  }
  var BusinessCardsPortrait$CARD_TRIFORCE_BACK_instance;
  function BusinessCardsPortrait$CARD_TRIFORCE_BACK_getInstance() {
    BusinessCardsPortrait_initFields();
    return BusinessCardsPortrait$CARD_TRIFORCE_BACK_instance;
  }
  BusinessCardsPortrait.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BusinessCardsPortrait',
    interfaces: [Enum]
  };
  function BusinessCardsPortrait$values() {
    return [BusinessCardsPortrait$CARD_TRIFORCE_getInstance(), BusinessCardsPortrait$CARD_TRIFORCE_BACK_getInstance()];
  }
  BusinessCardsPortrait.values = BusinessCardsPortrait$values;
  function BusinessCardsPortrait$valueOf(name) {
    switch (name) {
      case 'CARD_TRIFORCE':
        return BusinessCardsPortrait$CARD_TRIFORCE_getInstance();
      case 'CARD_TRIFORCE_BACK':
        return BusinessCardsPortrait$CARD_TRIFORCE_BACK_getInstance();
      default:throwISE('No enum constant image_path.BusinessCardsPortrait.' + name);
    }
  }
  BusinessCardsPortrait.valueOf_61zpoe$ = BusinessCardsPortrait$valueOf;
  function Logos(name, ordinal, value) {
    Enum.call(this);
    this.value = value;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Logos_initFields() {
    Logos_initFields = function () {
    };
    Logos$LOGO_BANIGHT_instance = new Logos('LOGO_BANIGHT', 0, 'images/art/logos_and_cards/' + 'BADay.png');
    Logos$LOGO_BADAY_instance = new Logos('LOGO_BADAY', 1, 'images/art/logos_and_cards/' + 'BANight.png');
    Logos$LOGO_MKS_instance = new Logos('LOGO_MKS', 2, 'images/art/logos_and_cards/' + 'shortMK.png');
    Logos$LOGO_KNGN_instance = new Logos('LOGO_KNGN', 3, 'images/art/logos_and_cards/' + 'ShortKangen-1.png');
    Logos$LOGO_CMS_instance = new Logos('LOGO_CMS', 4, 'images/art/logos_and_cards/' + 'shortCoulee.png');
  }
  var Logos$LOGO_BANIGHT_instance;
  function Logos$LOGO_BANIGHT_getInstance() {
    Logos_initFields();
    return Logos$LOGO_BANIGHT_instance;
  }
  var Logos$LOGO_BADAY_instance;
  function Logos$LOGO_BADAY_getInstance() {
    Logos_initFields();
    return Logos$LOGO_BADAY_instance;
  }
  var Logos$LOGO_MKS_instance;
  function Logos$LOGO_MKS_getInstance() {
    Logos_initFields();
    return Logos$LOGO_MKS_instance;
  }
  var Logos$LOGO_KNGN_instance;
  function Logos$LOGO_KNGN_getInstance() {
    Logos_initFields();
    return Logos$LOGO_KNGN_instance;
  }
  var Logos$LOGO_CMS_instance;
  function Logos$LOGO_CMS_getInstance() {
    Logos_initFields();
    return Logos$LOGO_CMS_instance;
  }
  Logos.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Logos',
    interfaces: [Enum]
  };
  function Logos$values() {
    return [Logos$LOGO_BANIGHT_getInstance(), Logos$LOGO_BADAY_getInstance(), Logos$LOGO_MKS_getInstance(), Logos$LOGO_KNGN_getInstance(), Logos$LOGO_CMS_getInstance()];
  }
  Logos.values = Logos$values;
  function Logos$valueOf(name) {
    switch (name) {
      case 'LOGO_BANIGHT':
        return Logos$LOGO_BANIGHT_getInstance();
      case 'LOGO_BADAY':
        return Logos$LOGO_BADAY_getInstance();
      case 'LOGO_MKS':
        return Logos$LOGO_MKS_getInstance();
      case 'LOGO_KNGN':
        return Logos$LOGO_KNGN_getInstance();
      case 'LOGO_CMS':
        return Logos$LOGO_CMS_getInstance();
      default:throwISE('No enum constant image_path.Logos.' + name);
    }
  }
  Logos.valueOf_61zpoe$ = Logos$valueOf;
  function MobileApp() {
    MobileApp_instance = this;
    this.WY_ART = MOBILE_PATH + 'iTunesArtwork.png';
  }
  function MobileApp$MobileAppImages(name, ordinal, value) {
    Enum.call(this);
    this.value = value;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function MobileApp$MobileAppImages_initFields() {
    MobileApp$MobileAppImages_initFields = function () {
    };
    MobileApp$MobileAppImages$WY_LAUNCH_instance = new MobileApp$MobileAppImages('WY_LAUNCH', 0, MOBILE_PATH + 'wy_launch.jpg');
    MobileApp$MobileAppImages$WY_HOME_instance = new MobileApp$MobileAppImages('WY_HOME', 1, MOBILE_PATH + 'wy_home.jpg');
    MobileApp$MobileAppImages$WY_ACTIVE_instance = new MobileApp$MobileAppImages('WY_ACTIVE', 2, MOBILE_PATH + 'wy_active.jpg');
    MobileApp$MobileAppImages$WY_SELFIE_instance = new MobileApp$MobileAppImages('WY_SELFIE', 3, MOBILE_PATH + 'wy_selfie.jpg');
    MobileApp$MobileAppImages$WY_LIST_instance = new MobileApp$MobileAppImages('WY_LIST', 4, MOBILE_PATH + 'wy_list.jpg');
    MobileApp$MobileAppImages$WY_LOG_instance = new MobileApp$MobileAppImages('WY_LOG', 5, MOBILE_PATH + 'wy_log.jpg');
    MobileApp$MobileAppImages$FH_LAUNCH_instance = new MobileApp$MobileAppImages('FH_LAUNCH', 6, MOBILE_PATH + 'fh_launch.jpg');
    MobileApp$MobileAppImages$FH_EVENTS_instance = new MobileApp$MobileAppImages('FH_EVENTS', 7, MOBILE_PATH + 'fh_events.jpg');
    MobileApp$MobileAppImages$FH_LOYALTY_instance = new MobileApp$MobileAppImages('FH_LOYALTY', 8, MOBILE_PATH + 'fh_loyalty.jpg');
    MobileApp$MobileAppImages$FH_ONTAP_instance = new MobileApp$MobileAppImages('FH_ONTAP', 9, MOBILE_PATH + 'fh_whatsOnTap.jpg');
  }
  var MobileApp$MobileAppImages$WY_LAUNCH_instance;
  function MobileApp$MobileAppImages$WY_LAUNCH_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$WY_LAUNCH_instance;
  }
  var MobileApp$MobileAppImages$WY_HOME_instance;
  function MobileApp$MobileAppImages$WY_HOME_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$WY_HOME_instance;
  }
  var MobileApp$MobileAppImages$WY_ACTIVE_instance;
  function MobileApp$MobileAppImages$WY_ACTIVE_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$WY_ACTIVE_instance;
  }
  var MobileApp$MobileAppImages$WY_SELFIE_instance;
  function MobileApp$MobileAppImages$WY_SELFIE_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$WY_SELFIE_instance;
  }
  var MobileApp$MobileAppImages$WY_LIST_instance;
  function MobileApp$MobileAppImages$WY_LIST_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$WY_LIST_instance;
  }
  var MobileApp$MobileAppImages$WY_LOG_instance;
  function MobileApp$MobileAppImages$WY_LOG_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$WY_LOG_instance;
  }
  var MobileApp$MobileAppImages$FH_LAUNCH_instance;
  function MobileApp$MobileAppImages$FH_LAUNCH_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$FH_LAUNCH_instance;
  }
  var MobileApp$MobileAppImages$FH_EVENTS_instance;
  function MobileApp$MobileAppImages$FH_EVENTS_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$FH_EVENTS_instance;
  }
  var MobileApp$MobileAppImages$FH_LOYALTY_instance;
  function MobileApp$MobileAppImages$FH_LOYALTY_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$FH_LOYALTY_instance;
  }
  var MobileApp$MobileAppImages$FH_ONTAP_instance;
  function MobileApp$MobileAppImages$FH_ONTAP_getInstance() {
    MobileApp$MobileAppImages_initFields();
    return MobileApp$MobileAppImages$FH_ONTAP_instance;
  }
  MobileApp$MobileAppImages.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MobileAppImages',
    interfaces: [Enum]
  };
  function MobileApp$MobileAppImages$values() {
    return [MobileApp$MobileAppImages$WY_LAUNCH_getInstance(), MobileApp$MobileAppImages$WY_HOME_getInstance(), MobileApp$MobileAppImages$WY_ACTIVE_getInstance(), MobileApp$MobileAppImages$WY_SELFIE_getInstance(), MobileApp$MobileAppImages$WY_LIST_getInstance(), MobileApp$MobileAppImages$WY_LOG_getInstance(), MobileApp$MobileAppImages$FH_LAUNCH_getInstance(), MobileApp$MobileAppImages$FH_EVENTS_getInstance(), MobileApp$MobileAppImages$FH_LOYALTY_getInstance(), MobileApp$MobileAppImages$FH_ONTAP_getInstance()];
  }
  MobileApp$MobileAppImages.values = MobileApp$MobileAppImages$values;
  function MobileApp$MobileAppImages$valueOf(name) {
    switch (name) {
      case 'WY_LAUNCH':
        return MobileApp$MobileAppImages$WY_LAUNCH_getInstance();
      case 'WY_HOME':
        return MobileApp$MobileAppImages$WY_HOME_getInstance();
      case 'WY_ACTIVE':
        return MobileApp$MobileAppImages$WY_ACTIVE_getInstance();
      case 'WY_SELFIE':
        return MobileApp$MobileAppImages$WY_SELFIE_getInstance();
      case 'WY_LIST':
        return MobileApp$MobileAppImages$WY_LIST_getInstance();
      case 'WY_LOG':
        return MobileApp$MobileAppImages$WY_LOG_getInstance();
      case 'FH_LAUNCH':
        return MobileApp$MobileAppImages$FH_LAUNCH_getInstance();
      case 'FH_EVENTS':
        return MobileApp$MobileAppImages$FH_EVENTS_getInstance();
      case 'FH_LOYALTY':
        return MobileApp$MobileAppImages$FH_LOYALTY_getInstance();
      case 'FH_ONTAP':
        return MobileApp$MobileAppImages$FH_ONTAP_getInstance();
      default:throwISE('No enum constant image_path.MobileApp.MobileAppImages.' + name);
    }
  }
  MobileApp$MobileAppImages.valueOf_61zpoe$ = MobileApp$MobileAppImages$valueOf;
  function MobileApp$IpadAppImages(name, ordinal, value) {
    Enum.call(this);
    this.value = value;
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function MobileApp$IpadAppImages_initFields() {
    MobileApp$IpadAppImages_initFields = function () {
    };
    MobileApp$IpadAppImages$LF_LAUCH_instance = new MobileApp$IpadAppImages('LF_LAUCH', 0, MOBILE_PATH + 'livefire.jpg');
    MobileApp$IpadAppImages$LF_HOME_instance = new MobileApp$IpadAppImages('LF_HOME', 1, MOBILE_PATH + 'livefire01.jpg');
    MobileApp$IpadAppImages$LF_BUILT_instance = new MobileApp$IpadAppImages('LF_BUILT', 2, MOBILE_PATH + 'livefire02.jpg');
  }
  var MobileApp$IpadAppImages$LF_LAUCH_instance;
  function MobileApp$IpadAppImages$LF_LAUCH_getInstance() {
    MobileApp$IpadAppImages_initFields();
    return MobileApp$IpadAppImages$LF_LAUCH_instance;
  }
  var MobileApp$IpadAppImages$LF_HOME_instance;
  function MobileApp$IpadAppImages$LF_HOME_getInstance() {
    MobileApp$IpadAppImages_initFields();
    return MobileApp$IpadAppImages$LF_HOME_instance;
  }
  var MobileApp$IpadAppImages$LF_BUILT_instance;
  function MobileApp$IpadAppImages$LF_BUILT_getInstance() {
    MobileApp$IpadAppImages_initFields();
    return MobileApp$IpadAppImages$LF_BUILT_instance;
  }
  MobileApp$IpadAppImages.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'IpadAppImages',
    interfaces: [Enum]
  };
  function MobileApp$IpadAppImages$values() {
    return [MobileApp$IpadAppImages$LF_LAUCH_getInstance(), MobileApp$IpadAppImages$LF_HOME_getInstance(), MobileApp$IpadAppImages$LF_BUILT_getInstance()];
  }
  MobileApp$IpadAppImages.values = MobileApp$IpadAppImages$values;
  function MobileApp$IpadAppImages$valueOf(name) {
    switch (name) {
      case 'LF_LAUCH':
        return MobileApp$IpadAppImages$LF_LAUCH_getInstance();
      case 'LF_HOME':
        return MobileApp$IpadAppImages$LF_HOME_getInstance();
      case 'LF_BUILT':
        return MobileApp$IpadAppImages$LF_BUILT_getInstance();
      default:throwISE('No enum constant image_path.MobileApp.IpadAppImages.' + name);
    }
  }
  MobileApp$IpadAppImages.valueOf_61zpoe$ = MobileApp$IpadAppImages$valueOf;
  MobileApp.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'MobileApp',
    interfaces: []
  };
  var MobileApp_instance = null;
  function MobileApp_getInstance() {
    if (MobileApp_instance === null) {
      new MobileApp();
    }
    return MobileApp_instance;
  }
  var MOBILE_PATH;
  _.Card = Card;
  Object.defineProperty(_, 'DIV', {
    get: function () {
      return DIV;
    }
  });
  Object.defineProperty(_, 'IMG', {
    get: function () {
      return IMG;
    }
  });
  Object.defineProperty(_, 'BUTTON', {
    get: function () {
      return BUTTON;
    }
  });
  Object.defineProperty(_, 'INPUT', {
    get: function () {
      return INPUT;
    }
  });
  Object.defineProperty(_, 'CLICK', {
    get: function () {
      return CLICK;
    }
  });
  Object.defineProperty(_, 'LOGOS_AND_CARDS', {
    get: function () {
      return LOGOS_AND_CARDS;
    }
  });
  Object.defineProperty(_, 'IMAGES', {
    get: function () {
      return IMAGES;
    }
  });
  Object.defineProperty(_, 'ART', {
    get: function () {
      return ART;
    }
  });
  Object.defineProperty(_, 'MOBILE', {
    get: function () {
      return MOBILE;
    }
  });
  Object.defineProperty(_, 'JPG', {
    get: function () {
      return JPG;
    }
  });
  Object.defineProperty(_, 'PNG', {
    get: function () {
      return PNG;
    }
  });
  Object.defineProperty(_, 'MINIMIZE', {
    get: function () {
      return MINIMIZE;
    }
  });
  Object.defineProperty(_, 'HIDE', {
    get: function () {
      return HIDE;
    }
  });
  Object.defineProperty(_, 'SHOW', {
    get: function () {
      return SHOW;
    }
  });
  Object.defineProperty(_, 'INDEX', {
    get: function () {
      return INDEX;
    }
  });
  Object.defineProperty(_, 'MOBILE_PORTFOLIO', {
    get: function () {
      return MOBILE_PORTFOLIO;
    }
  });
  Object.defineProperty(_, 'MOBILE_PORTFOLIO_TARGET', {
    get: function () {
      return MOBILE_PORTFOLIO_TARGET;
    }
  });
  Object.defineProperty(_, 'PORTFOLIO', {
    get: function () {
      return PORTFOLIO;
    }
  });
  Object.defineProperty(_, 'HOME', {
    get: function () {
      return HOME;
    }
  });
  Object.defineProperty(_, 'ART_CARD', {
    get: function () {
      return ART_CARD;
    }
  });
  Object.defineProperty(_, 'MOBILE_CARD', {
    get: function () {
      return MOBILE_CARD;
    }
  });
  Object.defineProperty(_, 'IS_ACTIVE', {
    get: function () {
      return IS_ACTIVE;
    }
  });
  Object.defineProperty(_, 'IS_VISIBLE', {
    get: function () {
      return IS_VISIBLE;
    }
  });
  Object.defineProperty(_, 'INVISIBLE', {
    get: function () {
      return INVISIBLE;
    }
  });
  Object.defineProperty(_, 'FOOTER_HOME', {
    get: function () {
      return FOOTER_HOME;
    }
  });
  Object.defineProperty(_, 'FOOTER_ART', {
    get: function () {
      return FOOTER_ART;
    }
  });
  Object.defineProperty(_, 'red', {
    get: function () {
      return red;
    }
  });
  Object.defineProperty(_, 'yellow', {
    get: function () {
      return yellow;
    }
  });
  Object.defineProperty(_, 'blue', {
    get: function () {
      return blue;
    }
  });
  _.a = a;
  _.div = div;
  _.img = img;
  _.input = input;
  _.button = button;
  _.hamburger = hamburger;
  _.navItems = navItems;
  _.home = home;
  _.footerHome = footerHome;
  _.footerArt = footerArt;
  _.art = art;
  _.mobile = mobile;
  _.albumArt = albumArt;
  _.cards = cards;
  _.cardsPortrait = cardsPortrait;
  _.logos = logos;
  _.portfolio = portfolio;
  _.mobilePortfolio = mobilePortfolio;
  _.mobilePortfolioTarget = mobilePortfolioTarget;
  _.index = index;
  _.getElement_61zpoe$ = getElement;
  _.configureInput_lrahc3$ = configureInput;
  _.show_y4uc6z$ = show;
  _.hide_y4uc6z$ = hide;
  _.defenestrate_y4uc6z$ = defenestrate;
  _.buildCard_bmjtf$ = buildCard;
  _.background = background;
  _.main_kand9s$ = main;
  _.NameAndEmail = NameAndEmail;
  _.Navigation = Navigation;
  _.goHome = goHome;
  _.viewArt = viewArt;
  _.viewMobile = viewMobile;
  _.destroyPortfolio = destroyPortfolio;
  _.showMobileItems = showMobileItems;
  _.showPortfolioItems = showPortfolioItems;
  _.headerWithText_61zpoe$ = headerWithText;
  _.View = View;
  Object.defineProperty(AlbumArt, 'SB_BLIND', {
    get: AlbumArt$SB_BLIND_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_EOS', {
    get: AlbumArt$SB_EOS_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_EOS_BANDPHOTO', {
    get: AlbumArt$SB_EOS_BANDPHOTO_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_THE_FUSE_INSIDE', {
    get: AlbumArt$SB_THE_FUSE_INSIDE_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_THE_FUSE_INSIDE_BACK', {
    get: AlbumArt$SB_THE_FUSE_INSIDE_BACK_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_ANGLES', {
    get: AlbumArt$SB_ANGLES_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_DEVILS_WING', {
    get: AlbumArt$SB_DEVILS_WING_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_I_AM_THE_HORIZON', {
    get: AlbumArt$SB_I_AM_THE_HORIZON_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_LOGO', {
    get: AlbumArt$SB_LOGO_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_LOGO_OLD', {
    get: AlbumArt$SB_LOGO_OLD_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_FLAME_LOGO', {
    get: AlbumArt$SB_FLAME_LOGO_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_DRUMHEAD', {
    get: AlbumArt$SB_DRUMHEAD_getInstance
  });
  Object.defineProperty(AlbumArt, 'SB_TIDAL_WAVE', {
    get: AlbumArt$SB_TIDAL_WAVE_getInstance
  });
  var package$image_path = _.image_path || (_.image_path = {});
  package$image_path.AlbumArt = AlbumArt;
  Object.defineProperty(BusinessCardsLandscape, 'CARD_RT', {
    get: BusinessCardsLandscape$CARD_RT_getInstance
  });
  Object.defineProperty(BusinessCardsLandscape, 'CARD_RT_BACK', {
    get: BusinessCardsLandscape$CARD_RT_BACK_getInstance
  });
  package$image_path.BusinessCardsLandscape = BusinessCardsLandscape;
  Object.defineProperty(BusinessCardsPortrait, 'CARD_TRIFORCE', {
    get: BusinessCardsPortrait$CARD_TRIFORCE_getInstance
  });
  Object.defineProperty(BusinessCardsPortrait, 'CARD_TRIFORCE_BACK', {
    get: BusinessCardsPortrait$CARD_TRIFORCE_BACK_getInstance
  });
  package$image_path.BusinessCardsPortrait = BusinessCardsPortrait;
  Object.defineProperty(Logos, 'LOGO_BANIGHT', {
    get: Logos$LOGO_BANIGHT_getInstance
  });
  Object.defineProperty(Logos, 'LOGO_BADAY', {
    get: Logos$LOGO_BADAY_getInstance
  });
  Object.defineProperty(Logos, 'LOGO_MKS', {
    get: Logos$LOGO_MKS_getInstance
  });
  Object.defineProperty(Logos, 'LOGO_KNGN', {
    get: Logos$LOGO_KNGN_getInstance
  });
  Object.defineProperty(Logos, 'LOGO_CMS', {
    get: Logos$LOGO_CMS_getInstance
  });
  package$image_path.Logos = Logos;
  Object.defineProperty(MobileApp$MobileAppImages, 'WY_LAUNCH', {
    get: MobileApp$MobileAppImages$WY_LAUNCH_getInstance
  });
  Object.defineProperty(MobileApp$MobileAppImages, 'WY_HOME', {
    get: MobileApp$MobileAppImages$WY_HOME_getInstance
  });
  Object.defineProperty(MobileApp$MobileAppImages, 'WY_ACTIVE', {
    get: MobileApp$MobileAppImages$WY_ACTIVE_getInstance
  });
  Object.defineProperty(MobileApp$MobileAppImages, 'WY_SELFIE', {
    get: MobileApp$MobileAppImages$WY_SELFIE_getInstance
  });
  Object.defineProperty(MobileApp$MobileAppImages, 'WY_LIST', {
    get: MobileApp$MobileAppImages$WY_LIST_getInstance
  });
  Object.defineProperty(MobileApp$MobileAppImages, 'WY_LOG', {
    get: MobileApp$MobileAppImages$WY_LOG_getInstance
  });
  Object.defineProperty(MobileApp$MobileAppImages, 'FH_LAUNCH', {
    get: MobileApp$MobileAppImages$FH_LAUNCH_getInstance
  });
  Object.defineProperty(MobileApp$MobileAppImages, 'FH_EVENTS', {
    get: MobileApp$MobileAppImages$FH_EVENTS_getInstance
  });
  Object.defineProperty(MobileApp$MobileAppImages, 'FH_LOYALTY', {
    get: MobileApp$MobileAppImages$FH_LOYALTY_getInstance
  });
  Object.defineProperty(MobileApp$MobileAppImages, 'FH_ONTAP', {
    get: MobileApp$MobileAppImages$FH_ONTAP_getInstance
  });
  MobileApp.prototype.MobileAppImages = MobileApp$MobileAppImages;
  Object.defineProperty(MobileApp$IpadAppImages, 'LF_LAUCH', {
    get: MobileApp$IpadAppImages$LF_LAUCH_getInstance
  });
  Object.defineProperty(MobileApp$IpadAppImages, 'LF_HOME', {
    get: MobileApp$IpadAppImages$LF_HOME_getInstance
  });
  Object.defineProperty(MobileApp$IpadAppImages, 'LF_BUILT', {
    get: MobileApp$IpadAppImages$LF_BUILT_getInstance
  });
  MobileApp.prototype.IpadAppImages = MobileApp$IpadAppImages;
  Object.defineProperty(package$image_path, 'MobileApp', {
    get: MobileApp_getInstance
  });
  Object.defineProperty(package$image_path, 'MOBILE_PATH', {
    get: function () {
      return MOBILE_PATH;
    }
  });
  DIV = 'div';
  IMG = 'img';
  BUTTON = 'button';
  INPUT = 'input';
  CLICK = 'click';
  LOGOS_AND_CARDS = 'logos_and_cards/';
  IMAGES = 'images/';
  ART = 'art/';
  MOBILE = 'mobile/';
  JPG = '.jpg';
  PNG = '.png';
  MINIMIZE = 'minimize';
  HIDE = 'hide';
  SHOW = 'show';
  INDEX = 'Kotlin-injection-target-index';
  MOBILE_PORTFOLIO = 'Kotlin-injection-target-mobile';
  MOBILE_PORTFOLIO_TARGET = 'mobile_portfolio';
  PORTFOLIO = 'Kotlin-injection-target-portfolio';
  HOME = 'home';
  ART_CARD = 'art';
  MOBILE_CARD = 'mobile';
  IS_ACTIVE = 'is-active';
  IS_VISIBLE = 'Navigation-items--visible';
  INVISIBLE = 'Navigation-items--invisible';
  FOOTER_HOME = 'footer_home';
  FOOTER_ART = 'footer_art';
  red = ['red', 'red-light', 'red-lighter'];
  yellow = ['yellow', 'yellow-light'];
  blue = ['blue', 'blue-light', 'blue-lighter'];
  MOBILE_PATH = 'images/mobile/';
  main([]);
  Kotlin.defineModule('JacobZivanDesign', _);
  return _;
}(typeof JacobZivanDesign === 'undefined' ? {} : JacobZivanDesign, kotlin);
