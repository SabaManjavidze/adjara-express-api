const express = require("express")
const axios = require("axios").default


const app = express()

const cors = require("cors")

const boiler = "https://api.adjaranet.com/api/v1/"
const movies_url=`movies?page=1&per_page=20&filters%5Blanguage%5D=GEO&filters%5Btype%5D=movie&filters%5Bonly_public%5D=yes&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet`
const tv_shows_url_dubbed=`movies?page=1&per_page=20&filters%5Blanguage%5D=ENG&filters%5Btype%5D=series&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&filters%5Bwith_files%5D=yes&sort=-upload_date&source=adjaranet`
const Slider_url = `movies/featured?source=adjaranet`
const top_tv_shows_by_period=`movies/top?type=series&period=month&page=1&per_page=20&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&source=adjaranet`
const top_movies_by_period = `movies/top?type=movie&period=month&page=1&per_page=20&filters%5Bwith_actors%5D=3&filters%5Bwith_directors%5D=1&source=adjaranet`

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.get("/",async (req,res)=>{
    res.json({welcome:"hello bich"})
})
app.get("/movies",async (req,res)=>{
    const resp = await axios.get(boiler+movies_url)
    const json = await resp.data.data
    res.json(json)
})
app.get("/tv-shows",async (req,res)=>{
    const resp = await axios.get(boiler+tv_shows_url_dubbed)
    const json = await resp.data.data
    res.send(json)
})
app.get("/slider",async (req,res)=>{
    const resp = await axios.get(boiler+Slider_url)
    const json = await resp.data.data
    res.send(json)
})
app.get("/moviefiles/:movieId/:sesNum",async (req,res)=>{
        const {movieId,sesNum}=req.params
        const url = `${boiler}movies/${movieId}/season-files/${sesNum}?source=adjaranet`;
        const resp = await axios.get(url,{headers:{'Content-Type': 'application/json'}})
        const json = resp.data.data
        res.send(json)

        .catch(err=>res.send(err))
})
app.get("/movie/:movieId",async (req,res)=>{
    const {movieId}=req.params
    const url = `${boiler}movies/${movieId}?filters%5Bwith_directors%5D=3&filters%5Bcustom_vast_zone%5D=no&source=adjaranet`;
    const resp = await axios.get(url)
    const json = await resp.data.data
    res.send(json)
})

const port = process.env.PORT || 4000
app.listen(port,()=>{console.log(`app running on port ${port}`)})