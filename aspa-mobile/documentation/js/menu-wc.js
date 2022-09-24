'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">aspa-mobile documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ebe6ca0cc3322e1a4a61f6ee61791c36"' : 'data-target="#xs-components-links-module-AppModule-ebe6ca0cc3322e1a4a61f6ee61791c36"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ebe6ca0cc3322e1a4a61f6ee61791c36"' :
                                            'id="xs-components-links-module-AppModule-ebe6ca0cc3322e1a4a61f6ee61791c36"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MarcasModalHoyPageModule.html" data-type="entity-link">MarcasModalHoyPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MarcasModalHoyPageModule-5c026d5605d31aaae1fcd4a38c65b5d4"' : 'data-target="#xs-components-links-module-MarcasModalHoyPageModule-5c026d5605d31aaae1fcd4a38c65b5d4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MarcasModalHoyPageModule-5c026d5605d31aaae1fcd4a38c65b5d4"' :
                                            'id="xs-components-links-module-MarcasModalHoyPageModule-5c026d5605d31aaae1fcd4a38c65b5d4"' }>
                                            <li class="link">
                                                <a href="components/MarcasModalHoyPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarcasModalHoyPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MarcasModalPageModule.html" data-type="entity-link">MarcasModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MarcasModalPageModule-3ab21fd2e48e693856dd88250df6da39"' : 'data-target="#xs-components-links-module-MarcasModalPageModule-3ab21fd2e48e693856dd88250df6da39"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MarcasModalPageModule-3ab21fd2e48e693856dd88250df6da39"' :
                                            'id="xs-components-links-module-MarcasModalPageModule-3ab21fd2e48e693856dd88250df6da39"' }>
                                            <li class="link">
                                                <a href="components/MarcasModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarcasModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PruebaDirectoIntentoHoyPageModule.html" data-type="entity-link">PruebaDirectoIntentoHoyPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PruebaDirectoIntentoHoyPageModule-a9e75f5a5e48910743b312ab41d75607"' : 'data-target="#xs-components-links-module-PruebaDirectoIntentoHoyPageModule-a9e75f5a5e48910743b312ab41d75607"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PruebaDirectoIntentoHoyPageModule-a9e75f5a5e48910743b312ab41d75607"' :
                                            'id="xs-components-links-module-PruebaDirectoIntentoHoyPageModule-a9e75f5a5e48910743b312ab41d75607"' }>
                                            <li class="link">
                                                <a href="components/PruebaDirectoIntentoHoyPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebaDirectoIntentoHoyPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PruebaDirectoIntentoPageModule.html" data-type="entity-link">PruebaDirectoIntentoPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PruebaDirectoIntentoPageModule-d0671ad367c5e26623a177ca690188ad"' : 'data-target="#xs-components-links-module-PruebaDirectoIntentoPageModule-d0671ad367c5e26623a177ca690188ad"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PruebaDirectoIntentoPageModule-d0671ad367c5e26623a177ca690188ad"' :
                                            'id="xs-components-links-module-PruebaDirectoIntentoPageModule-d0671ad367c5e26623a177ca690188ad"' }>
                                            <li class="link">
                                                <a href="components/PruebaDirectoIntentoPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebaDirectoIntentoPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PruebaHoyModalPageModule.html" data-type="entity-link">PruebaHoyModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PruebaHoyModalPageModule-0e3ae2473967120ef025c556ded167e9"' : 'data-target="#xs-components-links-module-PruebaHoyModalPageModule-0e3ae2473967120ef025c556ded167e9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PruebaHoyModalPageModule-0e3ae2473967120ef025c556ded167e9"' :
                                            'id="xs-components-links-module-PruebaHoyModalPageModule-0e3ae2473967120ef025c556ded167e9"' }>
                                            <li class="link">
                                                <a href="components/PruebaHoyModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebaHoyModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PruebaModalPageModule.html" data-type="entity-link">PruebaModalPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PruebaModalPageModule-b2d55df7d00a9331157a744920d7038c"' : 'data-target="#xs-components-links-module-PruebaModalPageModule-b2d55df7d00a9331157a744920d7038c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PruebaModalPageModule-b2d55df7d00a9331157a744920d7038c"' :
                                            'id="xs-components-links-module-PruebaModalPageModule-b2d55df7d00a9331157a744920d7038c"' }>
                                            <li class="link">
                                                <a href="components/PruebaModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebaModalPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-10ca0e70a45996a74d09567f56b2aee6"' : 'data-target="#xs-pipes-links-module-SharedModule-10ca0e70a45996a74d09567f56b2aee6"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-10ca0e70a45996a74d09567f56b2aee6"' :
                                            'id="xs-pipes-links-module-SharedModule-10ca0e70a45996a74d09567f56b2aee6"' }>
                                            <li class="link">
                                                <a href="pipes/FormatDate.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormatDate</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ToHourAndMinutes.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToHourAndMinutes</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageModule.html" data-type="entity-link">Tab1PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab1PageModule-bb3fb176ce42b5d494a7514998f48ca7"' : 'data-target="#xs-components-links-module-Tab1PageModule-bb3fb176ce42b5d494a7514998f48ca7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab1PageModule-bb3fb176ce42b5d494a7514998f48ca7"' :
                                            'id="xs-components-links-module-Tab1PageModule-bb3fb176ce42b5d494a7514998f48ca7"' }>
                                            <li class="link">
                                                <a href="components/ClasificacionPruebaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClasificacionPruebaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PruebaDirectoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebaDirectoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PruebasCompeticionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebasCompeticionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Tab1Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab1Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab1PageRoutingModule.html" data-type="entity-link">Tab1PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageModule.html" data-type="entity-link">Tab2PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab2PageModule-4a1fcacbe1d284cf8291f2da4f617455"' : 'data-target="#xs-components-links-module-Tab2PageModule-4a1fcacbe1d284cf8291f2da4f617455"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab2PageModule-4a1fcacbe1d284cf8291f2da4f617455"' :
                                            'id="xs-components-links-module-Tab2PageModule-4a1fcacbe1d284cf8291f2da4f617455"' }>
                                            <li class="link">
                                                <a href="components/ClasificacionPruebaHoyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClasificacionPruebaHoyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PruebaDirectoHoyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebaDirectoHoyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PruebasCompeticionHoyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebasCompeticionHoyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Tab2Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab2Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab2PageRoutingModule.html" data-type="entity-link">Tab2PageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageModule.html" data-type="entity-link">Tab3PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab3PageModule-f1076e3d20d6e06917c86972c4af98a1"' : 'data-target="#xs-components-links-module-Tab3PageModule-f1076e3d20d6e06917c86972c4af98a1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab3PageModule-f1076e3d20d6e06917c86972c4af98a1"' :
                                            'id="xs-components-links-module-Tab3PageModule-f1076e3d20d6e06917c86972c4af98a1"' }>
                                            <li class="link">
                                                <a href="components/Tab3Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab3Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link">TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-e91723c989787888396980cfb9cffea6"' : 'data-target="#xs-components-links-module-TabsPageModule-e91723c989787888396980cfb9cffea6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-e91723c989787888396980cfb9cffea6"' :
                                            'id="xs-components-links-module-TabsPageModule-e91723c989787888396980cfb9cffea6"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link">TabsPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AlturaService.html" data-type="entity-link">AlturaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppDataService.html" data-type="entity-link">AppDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClasificacionService.html" data-type="entity-link">ClasificacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CompeticionService.html" data-type="entity-link">CompeticionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InscripcionService.html" data-type="entity-link">InscripcionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MarcaNsService.html" data-type="entity-link">MarcaNsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MarcaSvService.html" data-type="entity-link">MarcaSvService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PasswordService.html" data-type="entity-link">PasswordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link">SessionService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Altura.html" data-type="entity-link">Altura</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AlturaGetItem.html" data-type="entity-link">AlturaGetItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Atleta.html" data-type="entity-link">Atleta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Clasificacion.html" data-type="entity-link">Clasificacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Competicion.html" data-type="entity-link">Competicion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICredenciales.html" data-type="entity-link">ICredenciales</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Inscripcion.html" data-type="entity-link">Inscripcion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Marca.html" data-type="entity-link">Marca</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MarcaNs.html" data-type="entity-link">MarcaNs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MarcaSv.html" data-type="entity-link">MarcaSv</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Prueba.html" data-type="entity-link">Prueba</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TipoPrueba.html" data-type="entity-link">TipoPrueba</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link">Usuario</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});