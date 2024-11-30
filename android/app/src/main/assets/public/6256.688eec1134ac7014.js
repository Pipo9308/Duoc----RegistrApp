"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6256],{6256:(v,d,l)=>{l.r(d),l.d(d,{CursosPageModule:()=>M});var g=l(177),C=l(4341),n=l(791),h=l(5260),c=l(467),s=l(3953),m=l(3471);const p=r=>["/pagina-curso",r];function f(r,a){if(1&r&&(s.j41(0,"ion-item",11)(1,"ion-label")(2,"h2"),s.EFF(3),s.k0s(),s.j41(4,"p"),s.EFF(5),s.k0s()(),s.j41(6,"ion-button",12),s.nrm(7,"ion-icon",13),s.EFF(8," Crear Clase "),s.k0s()()),2&r){const u=a.$implicit;s.R7$(3),s.JRh(u.nombre),s.R7$(2),s.JRh(u.descripcion),s.R7$(),s.Y8G("routerLink",s.eq3(3,p,u.id))}}const F=[{path:"",component:(()=>{var r;class a{constructor(e,o,t,i){this.cursosService=e,this.alertCtrl=o,this.toastController=t,this.router=i,this.cursos=[],this.nombreCurso="",this.siglaCurso="",this.institucionCurso="",this.descripcionCurso="",this.fechaClase="",this.horaInicioClase="",this.horaTerminoClase=""}ngOnInit(){this.loadCursos()}loadCursos(){this.cursosService.getCursos().subscribe(e=>{"Success"===e.message&&(this.cursos=e.cursos,this.cursos.forEach(o=>{this.cursosService.getClases(o.id).subscribe(t=>{"Success"===t.message&&(o.clases=t.clases)},t=>{console.error(`Error al obtener las clases del curso ${o.id}`,t),o.clases=[]})}))},e=>{console.error("Error al obtener los cursos",e),this.showAlert("Error","No se pudo cargar los cursos")})}onCreateCurso(){var e=this;this.isCursoFormValid()?this.cursosService.createCurso(this.nombreCurso,this.siglaCurso,this.institucionCurso,this.descripcionCurso).subscribe(function(){var o=(0,c.A)(function*(t){"Curso creado exitosamente"===t.message&&(yield e.presentToast("Curso creado exitosamente"),e.resetCursoForm(),e.loadCursos())});return function(t){return o.apply(this,arguments)}}(),function(){var o=(0,c.A)(function*(t){console.error("Error al crear el curso",t),yield e.presentToast("Hubo un error al crear el curso")});return function(t){return o.apply(this,arguments)}}()):this.presentToast("Por favor, complete todos los campos")}onCreateClase(e){var o=this;if(this.isClaseFormValid()){if(this.horaInicioClase>=this.horaTerminoClase)return void this.presentToast("La hora de inicio debe ser anterior a la hora de t\xe9rmino");this.cursosService.createClase(e,this.fechaClase,this.horaInicioClase,this.horaTerminoClase).subscribe(function(){var t=(0,c.A)(function*(i){"Clase creada exitosamente"===i.message&&(yield o.presentToast("Clase creada exitosamente"),o.resetClaseForm())});return function(i){return t.apply(this,arguments)}}(),function(){var t=(0,c.A)(function*(i){console.error("Error al crear la clase",i),yield o.presentToast("Hubo un error al crear la clase")});return function(i){return t.apply(this,arguments)}}())}else this.presentToast("Por favor, complete todos los campos de la clase")}onSaveClase(){const e=this.getSelectedCursoId();null!==e?this.onCreateClase(e):this.presentToast("Seleccione un curso v\xe1lido para crear la clase")}getSelectedCursoId(){return this.cursos.length?this.cursos[0].id:null}isCursoFormValid(){return""!==this.nombreCurso&&""!==this.siglaCurso&&""!==this.institucionCurso&&""!==this.descripcionCurso}isClaseFormValid(){return""!==this.fechaClase&&""!==this.horaInicioClase&&""!==this.horaTerminoClase}resetCursoForm(){this.nombreCurso="",this.siglaCurso="",this.institucionCurso="",this.descripcionCurso=""}resetClaseForm(){this.fechaClase="",this.horaInicioClase="",this.horaTerminoClase=""}showAlert(e,o){var t=this;return(0,c.A)(function*(){yield(yield t.alertCtrl.create({header:e,message:o,buttons:["OK"]})).present()})()}presentToast(e){var o=this;return(0,c.A)(function*(){(yield o.toastController.create({message:e,duration:2e3,position:"top"})).present()})()}}return(r=a).\u0275fac=function(e){return new(e||r)(s.rXU(m.$),s.rXU(n.hG),s.rXU(n.K_),s.rXU(h.Ix))},r.\u0275cmp=s.VBU({type:r,selectors:[["app-cursos"]],decls:40,vars:5,consts:[["slot","start"],["defaultHref","/"],[1,"ion-padding"],[1,"shadow-card"],[1,"card-title"],["lines","full"],["position","floating"],["required","",3,"ngModelChange","ngModel"],["auto-grow","true",3,"ngModelChange","ngModel"],["expand","block","color","primary",3,"click"],["class","curso-item",4,"ngFor","ngForOf"],[1,"curso-item"],["fill","outline","color","secondary",1,"curso-button",3,"routerLink"],["slot","start","name","create-outline"]],template:function(e,o){1&e&&(s.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),s.nrm(3,"ion-back-button",1),s.k0s(),s.j41(4,"ion-title"),s.EFF(5,"Cursos"),s.k0s()()(),s.j41(6,"ion-content",2)(7,"ion-card",3)(8,"ion-card-header")(9,"ion-card-title",4),s.EFF(10,"Crear Nuevo Curso"),s.k0s()(),s.j41(11,"ion-card-content")(12,"ion-item",5)(13,"ion-label",6),s.EFF(14,"Nombre del Curso"),s.k0s(),s.j41(15,"ion-input",7),s.mxI("ngModelChange",function(i){return s.DH7(o.nombreCurso,i)||(o.nombreCurso=i),i}),s.k0s()(),s.j41(16,"ion-item",5)(17,"ion-label",6),s.EFF(18,"Sigla"),s.k0s(),s.j41(19,"ion-input",7),s.mxI("ngModelChange",function(i){return s.DH7(o.siglaCurso,i)||(o.siglaCurso=i),i}),s.k0s()(),s.j41(20,"ion-item",5)(21,"ion-label",6),s.EFF(22,"Instituci\xf3n"),s.k0s(),s.j41(23,"ion-input",7),s.mxI("ngModelChange",function(i){return s.DH7(o.institucionCurso,i)||(o.institucionCurso=i),i}),s.k0s()(),s.j41(24,"ion-item",5)(25,"ion-label",6),s.EFF(26,"Descripci\xf3n"),s.k0s(),s.j41(27,"ion-textarea",8),s.mxI("ngModelChange",function(i){return s.DH7(o.descripcionCurso,i)||(o.descripcionCurso=i),i}),s.k0s()(),s.j41(28,"ion-button",9),s.bIt("click",function(){return o.onCreateCurso()}),s.EFF(29," Crear Curso "),s.k0s()()(),s.j41(30,"ion-card",3)(31,"ion-card-header")(32,"ion-card-title",4),s.EFF(33,"Cursos Existentes"),s.k0s()(),s.j41(34,"ion-card-content")(35,"ion-list")(36,"ion-list-header")(37,"ion-label"),s.EFF(38,"Cursos Disponibles"),s.k0s()(),s.DNE(39,f,9,5,"ion-item",10),s.k0s()()()()),2&e&&(s.R7$(15),s.R50("ngModel",o.nombreCurso),s.R7$(4),s.R50("ngModel",o.siglaCurso),s.R7$(4),s.R50("ngModel",o.institucionCurso),s.R7$(4),s.R50("ngModel",o.descripcionCurso),s.R7$(12),s.Y8G("ngForOf",o.cursos))},dependencies:[g.Sq,C.BC,C.YS,C.vS,n.Jm,n.QW,n.b_,n.I9,n.ME,n.tN,n.W9,n.eU,n.iq,n.$w,n.uz,n.he,n.nf,n.AF,n.nc,n.BC,n.ai,n.Gw,n.el,n.N7,h.Wk],styles:[".shadow-card[_ngcontent-%COMP%]{box-shadow:0 4px 6px #0000001a;border-radius:12px}"]}),a})()}];let b=(()=>{var r;class a{}return(r=a).\u0275fac=function(e){return new(e||r)},r.\u0275mod=s.$C({type:r}),r.\u0275inj=s.G2t({imports:[h.iI.forChild(F),h.iI]}),a})(),M=(()=>{var r;class a{}return(r=a).\u0275fac=function(e){return new(e||r)},r.\u0275mod=s.$C({type:r}),r.\u0275inj=s.G2t({imports:[g.MD,C.YN,n.bv,b]}),a})()}}]);