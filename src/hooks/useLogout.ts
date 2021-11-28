import { apolloClient } from "@/config/apollo";
import { useCommonStore } from "@/store/common.store";
import { usePlayerStore } from "@/store/player.store";

export default function useLogout() {
    const actionSetCurrentUser = useCommonStore(state => state.actionSetCurrentUser);
    const actionSetAccessToken = useCommonStore(state => state.actionSetAccessToken);
    const actionSetToastMessage = useCommonStore(state => state.actionSetToastMessage);
    const actionStop = usePlayerStore(state => state.actionStop);

    return () => {
        actionStop();
        apolloClient.resetStore();
        actionSetCurrentUser();
        actionSetAccessToken();
        actionSetToastMessage({
            title: "Logout successfully!",
            status: "info",
        });
    };
}
