import { client } from "../../Main";
import { Event } from "../../types/Event";

export default new Event({
    name: "clientReady",
    once: true,
    run() {
        const { commands, buttons, selects, modals, user } = client;
        
        console.log(`✅ ${user?.displayName} está Online!`);
        console.log(`📜 Comandos carregados: ${commands.size}`);
        console.log(`📜 Componentes carregados: ${buttons.size + selects.size + modals.size}`);
    }
});