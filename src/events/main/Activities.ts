import { client } from "../../Main";
import { Event } from "../../types/Event";
import { shuffleArray } from "../../utils/ArrayUtils";
import { getActivities } from "../../utils/Assets";

export default new Event({
    name: "clientReady",
    once: true,
    run() {
        const activities = getActivities();
        /* Se não tiver status, apenas ignore. */
        if (activities.length < 1) return;

        let activitiesQueue: typeof activities = [];
        let lastActivityName: string | undefined;

        /* Função para atualizar o status do Bot. */
        const updateStatus = () => {
            /* Recarrega a fila de status em uma ordem aleatória. */
            if (activitiesQueue.length < 1) {
                activitiesQueue = shuffleArray(activities);

                /* Evita que o ultimo elemento seja o primeiro da fila atual. */
                if (activities.length > 1 && lastActivityName && activitiesQueue[0]?.name === lastActivityName) {
                    const itemToMove = activitiesQueue.shift();
                    if (itemToMove) activitiesQueue.push(itemToMove);
                }
            }
            const currentActivity = activitiesQueue.shift();

            if (currentActivity) {
                /* Guarda o ultimo status do Bot. */
                lastActivityName = currentActivity.name;

                /* Atualiza o status do Bot. */
                client.user?.setPresence({
                    activities: [currentActivity],
                    status: 'idle'
                });

                console.log(`⌛ Status do Bot alterado: ${lastActivityName}`);
            }
        }

        updateStatus();
        setInterval(updateStatus, 25000);
    }
});