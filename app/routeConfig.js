import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import SearchContainer from '@containers/SearchContainer';
import LandingContainer from '@containers/LandingContainer';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
    search: {
        component: SearchContainer,
        ...routeConstants.search
    },
    home: {
        component: LandingContainer,
        ...routeConstants.home
    },
    notFoundPage: {
        component: NotFound,
        route: '/'
    }
};