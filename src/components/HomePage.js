
import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);
  const [cas, setCas] = useState(null);

  useEffect(() => {
    // Simuler les données pour le graphique Commune
    const simulatedData = [
      { rue: 'Rue A', cnt: 20 },
      { rue: 'Rue B', cnt: 35 },
      { rue: 'Rue C', cnt: 15 },
      // ... Ajoutez d'autres données simulées si nécessaire
    ];
    setData(simulatedData);
  }, []);

  useEffect(() => {
    // Simuler les données pour le graphique District
    const simulatedDatas = [
      { quartier: 'Salongo', nbr: 12 },
      { quartier: 'Righini', nbr: 8 },
      { quartier: 'livulu', nbr: 16 },
      { quartier: 'Kimpwanza', nbr: 10 },
      { quartier: 'Foire', nbr: 3 },
      { quartier: 'masano', nbr: 1 },
      { quartier: 'Mandrandelle', nbr: 2 },
      // ... Ajoutez d'autres données simulées si nécessaire
    ];
    setDatas(simulatedDatas);
  }, []);

  useEffect(() => {
    // Simuler les données pour le graphique Cas
    const simulatedCas = [
      { cas: 'Clinique', nbrx: 30 },
      { cas: 'centre de santé', nbrx: 15 },
      { cas: 'poly clinique', nbrx: 25 },
      // ... Ajoutez d'autres données simulées si nécessaire
    ];
    setCas(simulatedCas);
  }, []);

  useEffect(() => {
    // Création du graphique Chart.js pour Commune
    if (data !== null) {
      const labels = data.map((item) => item.rue);
      const values = data.map((item) => item.cnt);

      const ctx = document.getElementById('my-chart');
      Chart.register(...registerables);
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Types poste de santé',
              data: values,
              backgroundColor: 'red',
              borderColor: 'blue',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  useEffect(() => {
    // Création du graphique Chart.js pour District
    if (datas !== null) {
      const labels = datas.map((item) => item.quartier);
      const values = datas.map((item) => item.nbr);
      const barColors = ['red', 'blue', 'yellow', 'green', 'cyan', 'orange'];

      const ctx = document.getElementById('my-chart1');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Quartier',
              data: values,
              backgroundColor: barColors,
              borderColor: 'white',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [datas]);

  useEffect(() => {
    // Création du graphique Chart.js pour Cas
    if (cas !== null) {
      const labels = cas.map((item) => item.cas);
      const values = cas.map((item) => item.nbrx);
      const barColors = ['red', 'blue', 'yellow', 'green', 'orange', 'brown'];

      const ctx = document.getElementById('my-chart2');
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Type poste',
              data: values,
              backgroundColor: barColors,
              borderColor: 'white',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [cas]);

  return (
    <div>
      
      {/* Cards */}
      <div className="container mt-5">
        <div className="row">
      
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">AVIS</h5>
              <p className="card-text">40 avis des utilisateurs enregistrés</p>
              <i className="bi bi-beer"></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-3 border shadow-5">
            <div className="card-body">
              <h5 className="card-title">Poste de santé</h5>
              <p className="card-text"> 123 Poste de santé enregistrés</p>
              <i className="bi bi-universal-access-circle"></i>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card  mb-3">
            <div className="card-body">
              <h5 className="card-title">Utilisateur</h5>
              <p className="card-text">33 Utilisateurs enregistrés</p>
              <span className="bi bi-cup-fill"></span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Graphs */}
      <div className="container mt-4">
      <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Poste de santé par quartier</h5>
                    <canvas id="my-chart1"></canvas>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">types poste de santé</h5>
                    <canvas id="my-chart2"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
       

        {/* Footer */}
        <div className="row mt-5">
          <div className="col-md-12 text-center">
            <footer>
              <p>&copy; 2023 Urgence-App. All Rights Reserved.</p>
            </footer>
          </div>
        </div>
     
    </div>
  );
};

export default HomePage;


