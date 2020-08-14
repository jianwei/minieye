import { fakeOrganizationGroup } from '@/services/organization';

const OrganizationModel = {
    namespace: 'organization',
    state: {
        group: [],
        selected:[]
    },
    effects: {
        *fetchOrganization(_, { call, put, select }) {
            const data = yield call(fakeOrganizationGroup);
            yield put({
                type: 'organizationReducer',
                payload: data,
            });
        },
    },
    reducers: {
        organizationReducer(state, action) {
            return { ...state, group: action.payload };
        },
        selectedReducer(state, action) {
            return { ...state, selected: action.payload };
        },

    },
    //   subscriptions: {
    //     setup({ history }) {
    //       // Subscribe history(url) change, trigger `load` action if pathname is `/`
    //       history.listen(({ pathname, search }) => {
    //         if (typeof window.ga !== 'undefined') {
    //           window.ga('send', 'pageview', pathname + search);
    //         }
    //       });
    //     },
    //   },
};
export default OrganizationModel;
