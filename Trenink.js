const Trenink = {
  template: `
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Den</th>
          <th>Začátek</th>
          <th>Konec</th>
          <th>Úpravy</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dep in Treninks" :key="dep.TreninkId">
          <td>{{ dep.TreninkId }}</td>
          <td>{{ dep.DenTrenink }}</td>
          <td>
            <input type="time" v-model="dep.OdCasTrenink" :disabled="!dep.editable || dep.updating" @input="updateTime(dep)" step="2">
          </td>
          <td>
            <input type="time" v-model="dep.DoCasTrenink" :disabled="!dep.editable || dep.updating" @input="updateTime(dep)" step="2">
          </td>
          <td>
            <label class="switch">
              <input type="checkbox" v-model="dep.editable" @change="updateTime(dep)">
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
    
  `,
  data() {
    return {
      Treninks: [],
    };
  },
  methods: {
    refreshData() {
      axios.get(variables.API_URL + "Trenink").then((response) => {
        this.Treninks = response.data.map((dep) => {
          dep.editable = false; // Přidáme vlastnost editable pro sledování stavu editace
          dep.updating = false; // Přidáme vlastnost updating pro sledování stavu aktualizace
          return dep;
        });
      });
    },
    updateTime(dep){
      if(!dep.editable){
      dep.updating = true;// Nastavte stav updating na true před odesláním aktualizace
      axios
        .put(variables.API_URL + "Trenink", {
          TreninkId: dep.TreninkId,
          OdCasTrenink: dep.OdCasTrenink,
          DoCasTrenink: dep.DoCasTrenink,
        })
        .then((response) => {
          dep.updating = false; // Nastavte stav updating na false po úspěšném aktualizování
        })
        .catch((error) => {
          console.error(error);
          dep.updating = false; // Nastavte stav updating na false při chybě aktualizace
        })};
    },
  },
  mounted() {
    this.refreshData();
  },
};
