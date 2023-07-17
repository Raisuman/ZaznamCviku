const Result = {
    template: `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <div>
        <h2>Statistiky cvičení</h2>
        <canvas ref="lineChart"></canvas>
      </div>
    `,
    mounted() {
      // Kód pro načtení dat cvičení
      axios.get(variables.API_URL + "Cviky").then((response) => {
        const cviky = response.data;
  
        // Vytvoření objektu pro uchování celkového času cvičení pro každé unikátní datum
        const cviceniCelkem = {};
  
        // Výpočet celkového času cvičení pro každé unikátní datum
        cviky.forEach((cvik) => {
          const datum = cvik.DenCviku.substring(0, 10);
          const trvani = this.getZiskaniTrvaniCviceni(cvik); // Získání trvání cvičení v minutách
  
          if (cviceniCelkem.hasOwnProperty(datum)) {
            cviceniCelkem[datum] += trvani;
          } else {
            cviceniCelkem[datum] = trvani;
          }
        });
  
        // Příprava dat pro graf
        const data = {
          labels: [],
          datasets: [
            {
              label: "Celkový čas cvičení",
              data: [],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };
  
        // Naplnění dat pro graf
        for (const datum in cviceniCelkem) {
          const celkoveMinuty = cviceniCelkem[datum];
          const hodiny = Math.floor(celkoveMinuty / 60);
          const minuty = celkoveMinuty % 60;
  
          data.labels.push(datum);
          data.datasets[0].data.push(celkoveMinuty);
        }
  
        // Vykreslení line grafu
        new Chart(this.$refs.lineChart, {
          type: "line",
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const celkoveMinuty = context.parsed.y;
                    const hodiny = Math.floor(celkoveMinuty / 60);
                    const minuty = celkoveMinuty % 60;
                    return `Celkový čas: ${hodiny} hodin a ${minuty} minut`;
                  },
                },
              },
            },
          },
        });
      });
    },
    methods: {
      getZiskaniTrvaniCviceni(cvik) {
        const casCviku = cvik.CasCviku; // Předpokládáme, že casCviku je ve formátu "hh:mm"
        const [hodiny, minuty] = casCviku.split(":").map((str) => parseInt(str));
        return hodiny * 60 + minuty; // Převést čas na celkový počet minut
      },
    },
  };
  