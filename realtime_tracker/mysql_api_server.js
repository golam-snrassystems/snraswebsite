const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "snras_api",
    password: "Snr@s2025!Xw9",
    database: "waterQuality",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Device IDs that have MySQL tables
const devices = [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 
                 481, 482, 483, 484, 487, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505];

// Generate getMaxSize endpoints for all devices
devices.forEach(deviceId => {
    app.get(`/getMaxSize${deviceId}`, async (req, res) => {
        try {
            const [rows] = await pool.query(`SELECT MAX(id) as 'MAX(id)' FROM waterdata${deviceId}`);
            res.json(rows);
        } catch (error) {
            console.error(`Error fetching max size for device ${deviceId}:`, error);
            res.status(500).json({ error: "Database error" });
        }
    });
});

// Generate fetchData endpoints for all devices (paginated data)
devices.forEach(deviceId => {
    app.post(`/fetchData${deviceId}`, async (req, res) => {
        try {
            const { currentPage = 1, perPage = 50 } = req.body;
            const offset = (currentPage - 1) * perPage;
            
            const [rows] = await pool.query(
                `SELECT * FROM waterdata${deviceId} ORDER BY id DESC LIMIT ? OFFSET ?`,
                [perPage, offset]
            );
            res.json(rows);
        } catch (error) {
            console.error(`Error fetching data for device ${deviceId}:`, error);
            res.status(500).json({ error: "Database error" });
        }
    });
});

// Generate fetchAllRecord endpoints for all devices (all records for CSV)
devices.forEach(deviceId => {
    app.get(`/fetchAllRecord${deviceId}`, async (req, res) => {
        try {
            const [rows] = await pool.query(`SELECT * FROM waterdata${deviceId} ORDER BY id DESC`);
            res.json(rows);
        } catch (error) {
            console.error(`Error fetching all records for device ${deviceId}:`, error);
            res.status(500).json({ error: "Database error" });
        }
    });
});

// Generate analytics endpoints for all devices
devices.forEach(deviceId => {
    app.post(`/analytics${deviceId}`, async (req, res) => {
        try {
            const { interval } = req.body;
            let query = "";
            
            switch (interval) {
                case "Day":
                    // Last 24 hours, grouped by hour
                    query = `
                        SELECT 
                            AVG(\`do\`) as \`do\`,
                            AVG(tds) as tds,
                            AVG(ph) as ph,
                            AVG(temp) as temp,
                            AVG(co2) as co2,
                            DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d %H:00:00') as dateTime
                        FROM waterdata${deviceId}
                        WHERE STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s') >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
                        GROUP BY DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d %H')
                        ORDER BY dateTime ASC
                    `;
                    break;
                    
                case "Week":
                    // Last 7 days, grouped by day
                    query = `
                        SELECT 
                            AVG(\`do\`) as \`do\`,
                            AVG(tds) as tds,
                            AVG(ph) as ph,
                            AVG(temp) as temp,
                            AVG(co2) as co2,
                            DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d') as dateTime
                        FROM waterdata${deviceId}
                        WHERE STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s') >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                        GROUP BY DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d')
                        ORDER BY dateTime ASC
                    `;
                    break;
                    
                case "1Month":
                    // Last 30 days, grouped by day
                    query = `
                        SELECT 
                            AVG(\`do\`) as \`do\`,
                            AVG(tds) as tds,
                            AVG(ph) as ph,
                            AVG(temp) as temp,
                            AVG(co2) as co2,
                            DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d') as dateTime
                        FROM waterdata${deviceId}
                        WHERE STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s') >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                        GROUP BY DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d')
                        ORDER BY dateTime ASC
                    `;
                    break;
                    
                case "6Month":
                    // Last 6 months, grouped by month
                    query = `
                        SELECT 
                            AVG(\`do\`) as \`do\`,
                            AVG(tds) as tds,
                            AVG(ph) as ph,
                            AVG(temp) as temp,
                            AVG(co2) as co2,
                            DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m') as dateTime
                        FROM waterdata${deviceId}
                        WHERE STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s') >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
                        GROUP BY DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m')
                        ORDER BY dateTime ASC
                    `;
                    break;
                    
                default:
                    return res.status(400).json({ error: "Invalid interval" });
            }
            
            const [rows] = await pool.query(query);
            res.json(rows);
        } catch (error) {
            console.error(`Error fetching analytics for device ${deviceId}:`, error);
            res.status(500).json({ error: "Database error" });
        }
    });
});

// Default analytics endpoint (for device 481 or default)
app.post("/analytics", async (req, res) => {
    try {
        const { interval } = req.body;
        const deviceId = 481; // Default device
        
        let query = "";
        
        switch (interval) {
            case "Day":
                query = `
                    SELECT 
                        AVG(\`do\`) as \`do\`,
                        AVG(tds) as tds,
                        AVG(ph) as ph,
                        AVG(temp) as temp,
                        AVG(co2) as co2,
                        DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d %H:00:00') as dateTime
                    FROM waterdata${deviceId}
                    WHERE STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s') >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
                    GROUP BY DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d %H')
                    ORDER BY dateTime ASC
                `;
                break;
                
            case "Week":
                query = `
                    SELECT 
                        AVG(\`do\`) as \`do\`,
                        AVG(tds) as tds,
                        AVG(ph) as ph,
                        AVG(temp) as temp,
                        AVG(co2) as co2,
                        DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d') as dateTime
                    FROM waterdata${deviceId}
                    WHERE STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s') >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                    GROUP BY DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d')
                    ORDER BY dateTime ASC
                `;
                break;
                
            case "1Month":
                query = `
                    SELECT 
                        AVG(\`do\`) as \`do\`,
                        AVG(tds) as tds,
                        AVG(ph) as ph,
                        AVG(temp) as temp,
                        AVG(co2) as co2,
                        DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d') as dateTime
                    FROM waterdata${deviceId}
                    WHERE STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s') >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                    GROUP BY DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d')
                    ORDER BY dateTime ASC
                `;
                break;
                
            case "6Month":
                query = `
                    SELECT 
                        AVG(\`do\`) as \`do\`,
                        AVG(tds) as tds,
                        AVG(ph) as ph,
                        AVG(temp) as temp,
                        AVG(co2) as co2,
                        DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m-%d') as dateTime
                    FROM waterdata${deviceId}
                    WHERE STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s') >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
                    GROUP BY DATE_FORMAT(STR_TO_DATE(dateTime, '%d-%m-%Y %H:%i:%s'), '%Y-%m')
                    ORDER BY dateTime ASC
                `;
                break;
                
            default:
                return res.status(400).json({ error: "Invalid interval" });
        }
        
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// PDF generation endpoint (placeholder - you'll need to implement PDF generation logic)
app.get("/generatePdf", async (req, res) => {
    try {
        // TODO: Implement PDF generation
        // For now, returning a simple response
        res.status(501).json({ error: "PDF generation not implemented yet" });
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start server
const PORT = 8345;
app.listen(PORT, () => {
    console.log(`MySQL API Server running on port ${PORT}`);
    console.log(`Serving ${devices.length} device endpoints`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await pool.end();
    process.exit(0);
});
