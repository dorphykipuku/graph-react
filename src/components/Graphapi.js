import React, { useState, useEffect } from 'react';
import {Chart} from 'chart.js';
import axios from 'axios';

function Graphapi() {
  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    // Récupération des données depuis l'API backend avec Axios
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/graph/avenue');
      setData(response.data);
    };
   
    fetchData();

  }, []);

  useEffect(() => {
    // Récupération des données depuis l'API backend avec Axios
    const fetchDatas = async () => {
      const response = await axios.get('http://localhost:8080/graph/quartier');
      setDatas(response.data);
    };
   
    fetchDatas();

  }, []);


  useEffect(() => {
    // Création du graphique Chart.js si les données ont été récupérées
    if (data !== null) {
      const labels = data.map((item) => item.rue);
      const values = data.map((item) => item.cnt);

      const ctx = document.getElementById('my-chart');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Commune',
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
        // Destruction du graphique Chart.js et nettoyage des ressources utilisées
        chart.destroy();
      };
    }

    
  }, [data]);


  useEffect(() => {
    // Création du graphique Chart.js si les données ont été récupérées
    if (datas !== null) {
      const labels = datas.map((item) => item.quartier);
      const values = datas.map((item) => item.nbr);

      const ctx = document.getElementById('my-chart1');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'District',
              data: values,
              backgroundColor: 'darkblue',
              borderColor: 'darkblue',
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
        // Destruction du graphique Chart.js et nettoyage des ressources utilisées
        chart.destroy();
      };
    }

    
  }, [datas]);


  return (
    <div className='container'>
    <div className='row'>
      {data === null ? (
        <p>Chargement des données...</p>
      ) : (
        <>
         <div className='col-md-6'>
          <h2> taux d'insécurité par commune</h2>
          <canvas id="my-chart"></canvas>
         
        </div>
        <div className='col-md-6'>
        <h2> taux d'insécurité par District</h2>
          <canvas id="my-chart1"></canvas>
         
           </div>
        </>
       
      )}
      
    </div>
    </div>
  );
}

export default Graphapi;
