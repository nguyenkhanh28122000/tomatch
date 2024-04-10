const authPath = {
    login: '/login',
    register: '/register',
    examGroup: '/group-test/:idGroup/test/:questionBankID',
};

const privatePath = {
    user: '/user',
    personalResults: '/personal-results',
    groupResults: '/group-results',
    personalityTest: '/personality-test',
    psychologicalTest: '/psychological-test',
    createGroup: '/create-group',
    GroupDetail: '/group-results/:idGroup',
    MemberGroup: '/group-results/:idGroup/member/:idMember',
    DetailPersonalityGroup: '/group-results/:idGroup/detail-personality/:idExam',
    DetailPsychologicalGroup: '/group-results/:idGroup/detail-psychological/:idExam',

    DetailPersonalityResult: '/personal-results/personality-detail/:idExam',
    DetailPsychologicalResult: '/personal-results/psychological-detail/:idExam',
};

export { authPath, privatePath };
