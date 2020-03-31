//医生模块
const docService = resolve => require(["../pages/doc_service/doc_service"], resolve);
const patientsList = resolve => require(["../pages/patients_list/patients_list"], resolve);
const patientAdd = resolve => require(["../pages/patient_add/patient_add"], resolve);
const patientCases = resolve => require(["../pages/patient_cases/patient_cases"], resolve);
const myDoc = resolve => require(["../pages/my_doc/my_doc"], resolve);

export default [
  {
    path: "/docService/:dId",
    name: "docService",
    component: docService,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "选择服务"
    }
  },
  {
    path: "/patients_list/:dId",
    name: "patientsList",
    component: patientsList,
    meta: {
      needLogin: true,
      messageOn:true,
      title:"选择患者"
    }
  },
  {
    path: "/patient_add/:dId",
    name: "patientAdd",
    component: patientAdd,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "新建患者档案"
    }
  },
  {
    path: "/patient_cases/:dId/:id",
    name: "patientCases",
    component: patientCases,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "新建就诊记录"
    }
  },
  {
    path: "/my_doc/:dId",
    name: "myDoc",
    component: myDoc,
    meta: {
      needLogin: true,
      messageOn: true,
      title: "患者与医生互动落地页"
    }
  },
];
