import { apolloClient } from "../config/apollo";
import { useCommonStore } from "../store/common.store";


export default function useLogout() {
    const actionSetCurrentUser = useCommonStore(state => state.actionSetCurrentUser);
    const actionSetAccessToken = useCommonStore(state => state.actionSetAccessToken);
    const actionSetToastMessage = useCommonStore(state => state.actionSetToastMessage);

    return () => {
        apolloClient.resetStore();
        actionSetCurrentUser();
        actionSetAccessToken();
        actionSetToastMessage({
            title: 'Logout successfully!',
            status: 'info',
        });
    }
}