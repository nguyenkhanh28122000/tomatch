import { LoginScreen, RegisterScreen } from '../pages/Auth';
import { HomeScreen, PersonalResultsScreen, GroupResultsScreen } from '../pages/Home';
import { TestGroupScreen, FormPersonalityTestScreen, FormPsychologicalTestScreen } from '../pages/QuestionForm';
import { CreateGroupScreen } from '../pages/CreateGroup';
import { UserScreen } from '../pages/User';
import { GroupsDetailScreen, MemberResultScreen } from '../pages/GroupResult';
import { FormQuestionResultBiscScreen, FormQuestionResultBeckScreen } from '../pages/FormQuestionResult';
import { authPath, privatePath } from './paths';

const publicRoutes = [
    {
        path: authPath.login,
        element: LoginScreen,
        layout: null,
    },
    {
        path: authPath.register,
        element: RegisterScreen,
        layout: null,
    },
    {
        path: authPath.examGroup,
        element: TestGroupScreen,
        layoutHome: null,
    },
];

const privateRoutes = [
    {
        path: privatePath.user,
        element: UserScreen,
        layout: null,
        layoutHome: null,
    },
    {
        path: privatePath.personalResults,
        element: PersonalResultsScreen,
        layoutHome: HomeScreen,
    },
    {
        path: privatePath.groupResults,
        element: GroupResultsScreen,
        layoutHome: HomeScreen,
    },
    {
        path: privatePath.personalityTest,
        element: FormPersonalityTestScreen,
        layoutHome: null,
    },
    {
        path: privatePath.psychologicalTest,
        element: FormPsychologicalTestScreen,
        layoutHome: null,
    },
    {
        path: privatePath.createGroup,
        element: CreateGroupScreen,
        layoutHome: null,
    },
    {
        path: privatePath.DetailPersonalityResult,
        element: FormQuestionResultBiscScreen,
        layoutHome: null,
    },
    {
        path: privatePath.DetailPsychologicalResult,
        element: FormQuestionResultBeckScreen,
        layoutHome: null,
    },
    {
        path: privatePath.GroupDetail,
        element: GroupsDetailScreen,
        layoutHome: null,
    },
    {
        path: privatePath.MemberGroup,
        element: MemberResultScreen,
        layoutHome: null,
    },
    {
        path: privatePath.DetailPeoPleGroup,
        element: FormQuestionResultBiscScreen,
        layoutHome: null,
    },
    {
        path: privatePath.DetailPersonalityGroup,
        element: FormQuestionResultBiscScreen,
        layoutHome: null,
    },
    {
        path: privatePath.DetailPsychologicalGroup,
        element: FormQuestionResultBeckScreen,
        layoutHome: null,
    },
];

export { publicRoutes, privateRoutes };
