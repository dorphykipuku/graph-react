import React, { useState, useEffect } from 'react';
import {Chart, registerables} from 'chart.js';
import axios from 'axios';

function CrimGraph() {
  const [data, setData] = useState(null);
  const [datas, setDatas] = useState(null);
  const [cas, setCas] = useState(null);

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
    // Récupération des données depuis l'API backend avec Axios
    const fetchCas = async () => {
      const response = await axios.get('http://localhost:8080/graph/cas');
      setCas(response.data);
    };
   
    fetchCas();

  }, []);


  useEffect(() => {
    // Création du graphique Chart.js si les données ont été récupérées
    if (data !== null) {
      const labels = data.map((item) => item.rue);
      const values = data.map((item) => item.cnt);

      const ctx = document.getElementById('my-chart');
      Chart.register(...registerables);
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
      const barColors = ["red", "blue", "yellow", "green"]
      const ctx = document.getElementById('my-chart1');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'District',
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
        // Destruction du graphique Chart.js et nettoyage des ressources utilisées
        chart.destroy();
      };
    }

    
  }, [datas]);



  useEffect(() => {
    // Création du graphique Chart.js si les données ont été récupérées
    if (cas !== null) {
      const labels = cas.map((item) => item.cas);
      const values = cas.map((item) => item.nbrx);
      const barColors = ["red", "blue", "yellow", "green", "orange", "brown"]
      const ctx = document.getElementById('my-chart2');
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Cas',
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
        // Destruction du graphique Chart.js et nettoyage des ressources utilisées
        chart.destroy();
      };
    }

    
  }, [cas]);


  return (
    <div className='container'>
      <br/>
    <div className='row' style={{ padding: 10}}>
      <center><h2> Statistique insécurité ville de Kinshasa</h2></center>
      <br/>
      {data === null ? (
        <p>Chargement des données...</p>
      ) : (
        <>
      
         <div className='col-md-6'>
         <br/>
          <h2> taux d'insécurité par District</h2>
          <canvas id="my-chart1"></canvas>
         
        </div>
        <div className='col-md-6'>
        <br/>
        <h2> taux d'insécurité par Cas</h2>
          <canvas id="my-chart2"></canvas>
         
           </div>
           <div className='col-md-10'>
        <br/>
       <center><h2> taux d'insécurité par Commune</h2></center>  
          <canvas id="my-chart"></canvas>
         
           </div>
          
        </>
       
      )}
      
    </div>
    </div>
  );
}

export default CrimGraph;
