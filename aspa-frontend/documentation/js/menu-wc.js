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
                    <a href="index.html" data-type="index-link">aspa documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
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
                                            'data-target="#components-links-module-AppModule-a75f3aaa5738962c86f1d34505ef17fb"' : 'data-target="#xs-components-links-module-AppModule-a75f3aaa5738962c86f1d34505ef17fb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a75f3aaa5738962c86f1d34505ef17fb"' :
                                            'id="xs-components-links-module-AppModule-a75f3aaa5738962c86f1d34505ef17fb"' }>
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
                                <a href="modules/AtletasModule.html" data-type="entity-link">AtletasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AtletasModule-f7763b494b99cb3f78890e204aac501b"' : 'data-target="#xs-components-links-module-AtletasModule-f7763b494b99cb3f78890e204aac501b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AtletasModule-f7763b494b99cb3f78890e204aac501b"' :
                                            'id="xs-components-links-module-AtletasModule-f7763b494b99cb3f78890e204aac501b"' }>
                                            <li class="link">
                                                <a href="components/AtletaFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AtletaFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AtletasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AtletasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AtletasListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AtletasListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AtletasRoutingModule.html" data-type="entity-link">AtletasRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ClubesModule.html" data-type="entity-link">ClubesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ClubesModule-876839d6afa5e16c3dc0585abe6804c9"' : 'data-target="#xs-components-links-module-ClubesModule-876839d6afa5e16c3dc0585abe6804c9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ClubesModule-876839d6afa5e16c3dc0585abe6804c9"' :
                                            'id="xs-components-links-module-ClubesModule-876839d6afa5e16c3dc0585abe6804c9"' }>
                                            <li class="link">
                                                <a href="components/ClubPopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClubPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClubesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClubesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClubesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ClubesListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompeticionesModule.html" data-type="entity-link">CompeticionesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CompeticionesModule-99eb77eb984e297f826d9022e74f842b"' : 'data-target="#xs-components-links-module-CompeticionesModule-99eb77eb984e297f826d9022e74f842b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CompeticionesModule-99eb77eb984e297f826d9022e74f842b"' :
                                            'id="xs-components-links-module-CompeticionesModule-99eb77eb984e297f826d9022e74f842b"' }>
                                            <li class="link">
                                                <a href="components/AlturaEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlturaEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlturasAddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlturasAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompeticionPopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompeticionPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompeticionesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompeticionesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CompeticionesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CompeticionesListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HojaDeCampoNoSvComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HojaDeCampoNoSvComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HojaDeCampoSvComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HojaDeCampoSvComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InscripcionesAtletasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InscripcionesAtletasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InscripcionesListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InscripcionesListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PruebaAyudaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebaAyudaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PruebaPopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebaPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PruebasListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PruebasListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultadoIntentoNoSvComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultadoIntentoNoSvComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultadoIntentoSvComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResultadoIntentoSvComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompeticionesRoutingModule.html" data-type="entity-link">CompeticionesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-1f32d0224a76dd25c8c8cb478a195996"' : 'data-target="#xs-injectables-links-module-CoreModule-1f32d0224a76dd25c8c8cb478a195996"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-1f32d0224a76dd25c8c8cb478a195996"' :
                                        'id="xs-injectables-links-module-CoreModule-1f32d0224a76dd25c8c8cb478a195996"' }>
                                        <li class="link">
                                            <a href="injectables/SessionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SessionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DisciplinasRoutingModule.html" data-type="entity-link">DisciplinasRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DisciplinasRoutingModule.html" data-type="entity-link">DisciplinasRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutModule.html" data-type="entity-link">LayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LayoutModule-78ebde9cfa65a0398a1be8a577b10932"' : 'data-target="#xs-components-links-module-LayoutModule-78ebde9cfa65a0398a1be8a577b10932"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LayoutModule-78ebde9cfa65a0398a1be8a577b10932"' :
                                            'id="xs-components-links-module-LayoutModule-78ebde9cfa65a0398a1be8a577b10932"' }>
                                            <li class="link">
                                                <a href="components/BreadcrumbComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BreadcrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidenavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserInfoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserInfoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutRoutingModule.html" data-type="entity-link">LayoutRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PublicModule.html" data-type="entity-link">PublicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PublicModule-59402cf042390ed085b1595bb2867f6a"' : 'data-target="#xs-components-links-module-PublicModule-59402cf042390ed085b1595bb2867f6a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublicModule-59402cf042390ed085b1595bb2867f6a"' :
                                            'id="xs-components-links-module-PublicModule-59402cf042390ed085b1595bb2867f6a"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-0acc211283fcb70a289b09dea39bfb85"' : 'data-target="#xs-components-links-module-SharedModule-0acc211283fcb70a289b09dea39bfb85"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-0acc211283fcb70a289b09dea39bfb85"' :
                                            'id="xs-components-links-module-SharedModule-0acc211283fcb70a289b09dea39bfb85"' }>
                                            <li class="link">
                                                <a href="components/ActionsFooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActionsFooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CampoPopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CampoPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmacionPopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmacionPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmptyStateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmptyStateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpinnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-0acc211283fcb70a289b09dea39bfb85"' : 'data-target="#xs-pipes-links-module-SharedModule-0acc211283fcb70a289b09dea39bfb85"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-0acc211283fcb70a289b09dea39bfb85"' :
                                            'id="xs-pipes-links-module-SharedModule-0acc211283fcb70a289b09dea39bfb85"' }>
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
                                <a href="modules/TiposPruebaModule.html" data-type="entity-link">TiposPruebaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TiposPruebaModule-f30148be5a4a388a79a5d724a1e337cd"' : 'data-target="#xs-components-links-module-TiposPruebaModule-f30148be5a4a388a79a5d724a1e337cd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TiposPruebaModule-f30148be5a4a388a79a5d724a1e337cd"' :
                                            'id="xs-components-links-module-TiposPruebaModule-f30148be5a4a388a79a5d724a1e337cd"' }>
                                            <li class="link">
                                                <a href="components/TipoPruebaPopupComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TipoPruebaPopupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TiposPruebaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TiposPruebaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TiposPruebaListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TiposPruebaListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuariosModule.html" data-type="entity-link">UsuariosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsuariosModule-bcc7646bfbfdfe1f409310f25f38448d"' : 'data-target="#xs-components-links-module-UsuariosModule-bcc7646bfbfdfe1f409310f25f38448d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsuariosModule-bcc7646bfbfdfe1f409310f25f38448d"' :
                                            'id="xs-components-links-module-UsuariosModule-bcc7646bfbfdfe1f409310f25f38448d"' }>
                                            <li class="link">
                                                <a href="components/UsuarioFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsuarioFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsuariosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsuariosListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuariosRoutingModule.html" data-type="entity-link">UsuariosRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/MarcaNsResquestItem.html" data-type="entity-link">MarcaNsResquestItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/MarcaSvResquestItem.html" data-type="entity-link">MarcaSvResquestItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/SidenavElement.html" data-type="entity-link">SidenavElement</a>
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
                                    <a href="injectables/AtletaService.html" data-type="entity-link">AtletaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClasificacionService.html" data-type="entity-link">ClasificacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClubService.html" data-type="entity-link">ClubService</a>
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
                                    <a href="injectables/PruebaService.html" data-type="entity-link">PruebaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionService.html" data-type="entity-link">SessionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TipoPruebaService.html" data-type="entity-link">TipoPruebaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioService.html" data-type="entity-link">UsuarioService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuardService.html" data-type="entity-link">AdminGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AthleteGuardService.html" data-type="entity-link">AthleteGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/JudgeGuardService.html" data-type="entity-link">JudgeGuardService</a>
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
                                <a href="interfaces/AlturaDialogResponse.html" data-type="entity-link">AlturaDialogResponse</a>
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
                                <a href="interfaces/Club.html" data-type="entity-link">Club</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Column.html" data-type="entity-link">Column</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Competicion.html" data-type="entity-link">Competicion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link">DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICredentials.html" data-type="entity-link">ICredentials</a>
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
                                <a href="interfaces/MejorMarca.html" data-type="entity-link">MejorMarca</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MejorMarca-1.html" data-type="entity-link">MejorMarca</a>
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