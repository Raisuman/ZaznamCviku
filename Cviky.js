const Cviky = {
  template: `
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div>
      <button type="button"
              class="round2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="addClick()"> Přidat
              &#43;
      </button>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>
              <div class="d-flex flex-row">
                <input class="form-control m-2"
                  v-model="CvikyIdFilter"
                  @keyup="FilterFn()"
                  placeholder="Id Filter">
              </div>
              Id
            </th>
            <th>
              <div class="d-flex flex-row">
                <input class="form-control m-2"
                  v-model="DruhCvikuFilter"
                  @keyup="FilterFn()"
                  placeholder="Druh Filter">   
              </div>
              Druh cvičení
            </th>
            <th>
              <div class="d-flex flex-row">
                <input class="form-control m-2"
                  v-model="CasCvikuFilter"
                  @keyup="FilterFn()"
                  placeholder="Čas Filter">

                  <button type="button" class="round2"
                  @click="sortResult('CasCviku', true)">↓</button>

                  <button type="button" class="round2"
                  @click="sortResult('CasCviku', false)">↑</button>

              </div>
              Čas
            </th>
            <th>
              <div class="d-flex flex-row">
                <input class="form-control m-2"
                  v-model="DenCvikuFilter"
                  @keyup="FilterFn()"
                  placeholder="Den Filter">

                  <button type="button" class="round2"
                  @click="sortResult('DenCviku', true)">↓</button>

                  <button type="button" class="round2"
                  @click="sortResult('DenCviku', false)">↑</button>

              </div>
              Datum
            </th>
            <th>
              Možnosti
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dep in Cvikies">
            <td>{{ dep.CvikyId }}</td>
            <td>{{ dep.DruhCviku }}</td>
            <td>{{ formatDateTime(dep.CasCviku) }}</td>
            <td>{{ dep.DenCviku.substring(0, 10) }}</td>
            <td>
              <button type="button"
                class="round2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="editClick(dep)">&#9998;</button>
              <button type="button"
                @click="deleteClick(dep.CvikyId)"
                class="round2">&#215;</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <span class="input-group-text"> Druh cviku </span>
                <input type="text" class="form-control" v-model="DruhCviku">
                <span class="input-group-text"> Čas </span>
                <input type="time" class="form-control" v-model="CasCviku" step="2">
                <span class="input-group-text"> Den</span>
                <input type="date" class="form-control" v-model="DenCviku">
              </div>
              <button type="button"
                @click="createClick()"
                v-if="CvikyId === 0"
                class="btn btn-primary">
                Create
              </button>
              <button type="button"
                @click="updateClick()"
                v-if="CvikyId !== 0"
                class="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      Cvikies: [],
      modalTitle: "",
      DruhCviku: "",
      CasCviku: "",
      DenCviku: "",
      CvikyId: 0,
      CvikyIdFilter: "",
      DruhCvikuFilter: "",
      CasCvikuFilter: "",
      DenCvikuFilter: "",
      CvikiesWithoutFilter: []
    };
  },
  methods: {
    refreshData() {
      axios.get(variables.API_URL + "Cviky").then((response) => {
        this.Cvikies = response.data;
        this.CvikiesWithoutFilter = response.data;
      });
    },
    addClick() {
      this.modalTitle = "Add Cviky";
      this.CvikyId = 0;
      this.DruhCviku = "";
      this.CasCviku = "";
      this.DenCviku = "";
    },
    editClick(dep) {
      this.modalTitle = "Edit Cviky";
      this.CvikyId = dep.CvikyId;
      this.DruhCviku = dep.DruhCviku;
      this.CasCviku = dep.CasCviku;

      const date = new Date(dep.DenCviku);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      this.DenCviku = `${year}-${month}-${day}`;
    },
    createClick() {
      axios
        .post(variables.API_URL + "Cviky", {
          DruhCviku: this.DruhCviku,
          CasCviku: this.CasCviku,
          DenCviku: this.DenCviku
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
    updateClick() {
      axios
        .put(variables.API_URL + "Cviky", {
          CvikyId: this.CvikyId,
          DruhCviku: this.DruhCviku,
          CasCviku: this.CasCviku,
          DenCviku: this.DenCviku
        })
        .then((response) =>
{
          this.refreshData();
          alert(response.data);
        });
    },
    deleteClick(id) {
      if (!confirm("Jste si jistý?")) {
        return;
      }
      axios
        .delete(variables.API_URL + "Cviky/" + id)
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
    FilterFn() {
      var CvikyIdFilter = this.CvikyIdFilter.toString().toLowerCase();
      var DruhCvikuFilter = this.DruhCvikuFilter.toString().toLowerCase();
      var CasCvikuFilter = this.CasCvikuFilter.toString().toLowerCase();
      var DenCvikuFilter = this.DenCvikuFilter.toString().toLowerCase();
    
      this.Cvikies = this.CvikiesWithoutFilter.filter(function (el) {
        return (
          el.CvikyId.toString().toLowerCase().includes(CvikyIdFilter) &&
          el.DruhCviku.toString().toLowerCase().includes(DruhCvikuFilter) &&
          el.CasCviku.toString().toLowerCase().includes(CasCvikuFilter) &&
          el.DenCviku.toString().toLowerCase().includes(DenCvikuFilter)
        );
      });
    },
    formatDateTime(dateTime) {
      return dateTime.substring(0, 10);
    },
    sortResult(prop,asc){
        this.Cvikies=this.CvikiesWithoutFilter.sort(function(a,b){
          if(asc){
            return(a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
          }
          else{
            return(b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
          }
        })
    },
  },
  mounted() {
    this.refreshData();
  }
};
