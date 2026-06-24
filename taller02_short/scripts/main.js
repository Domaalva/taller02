/**
 * @file main.js
 * @description Main JavaScript file for the Coffee Sales Dashboard.
 */

// Formateador de moneda USD
const fmtUSD = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

let loadData = () => {
    const tbody = document.getElementById('transacciones');

    try {
        fetch('https://raw.githubusercontent.com/DATA-DAWM/Datos/refs/heads/main/Coffee/Coffe_sales.xml')
            .then(response => response.text())

            .then(xml => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xml.trim(), 'application/xml');
                return doc;
            })
            .then(doc => {
                tbody.innerHTML = '';
                const rows = Array.from(doc.querySelectorAll('row')).slice(0, 20);

                rows.forEach(row => {
                    const date = row.querySelector('Date')?.textContent || '';
                    const coffee = row.querySelector('coffee_name')?.textContent || '';
                    const moneyValue = Number(row.querySelector('money')?.textContent || 0);
                    const money = fmtUSD.format(moneyValue);

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${date}</td>
                        <td>${coffee}</td>
                        <td>${money}</td>
                    `;

                    tbody.appendChild(tr);
                });
            })
            .catch(err => {
                console.error('Error cargando datos:', err);
            });

    } catch (err) {
        console.error(err);
    }
}

window.addEventListener('DOMContentLoaded', loadData);