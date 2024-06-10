import Highlights from "@/components/Highlight/CricketHighlights";
import Featured from "@/components/Layout/Featured";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Live from "@/components/Live/Live";


import { mongooseConnect } from "@/lib/mongoose";
import { Highlight } from "@/models/Highlight";
import { Schedule } from "@/models/Schedule";
import { Category } from "@/models/Category";
import FootballLive from "@/components/Live/football/FootballLive";
import FootballHighlights from "@/components/Highlight/Footballhighlights";
import UfcHighlights from "@/components/Highlight/Ufchighlights";
import CricketHighlights from "@/components/Highlight/CricketHighlights";
import NationalLive from "@/components/Live/NationalGames/NationalLive";
import FormulaLive from "@/components/Live/Formula1/FormulaLive";
import CopaLive from "@/components/Live/football/CopaAmerica/CopaLive";
import EplLive from "@/components/Live/football/EPL/EplLive";
import UefaLive from "@/components/Live/football/UEFA/UefaLive";
import EuroLive from "@/components/Live/football/Euro_Cup/EuroLive";
import FifaLive from "@/components/Live/football/Fifa/FifaLive";
import IccLive from "@/components/Live/cricket/ICC_WC/IccLive";
import IccTestLive from "@/components/Live/cricket/ICC_Test/IccTestLive";
import AsiaLive from "@/components/Live/cricket/Asia_Cup/AsiaLive";
import IccT20Live from "@/components/Live/cricket/ICC_T20/IccT20Live";












export default function HomePage({featuredSchedule,liveSchedule,crickethighlight, footballSchedule, footballhighlight, ufchighlight,national,formula,copa,epl,uefa,euro,fifa,iccwc,icctest,asiacup,icct20}) {
 
   return(

    <div> 
      <Header />
      <Featured  schedule={featuredSchedule}/> 
      <Live schedule={liveSchedule} />
    <IccT20Live icct20={icct20}/>
  
    <AsiaLive asiacup={asiacup}/>
      <IccLive iccwc={iccwc}/>
    <IccTestLive icctest={icctest}/>
      <FootballLive football={footballSchedule}/> 
    <FifaLive fifa={fifa}/>
   <CopaLive copa={copa}/>
    <EuroLive euro={euro}/>
   <EplLive epl={epl}/>
    <UefaLive uefa={uefa}/>
     <NationalLive national={national}/> 
   <FormulaLive formula={formula}/> 

<CricketHighlights crickethighlight ={crickethighlight}/> 
      <FootballHighlights footballhighlight={footballhighlight} />
      <UfcHighlights ufchighlight ={ufchighlight} />

      <Footer />
    </div>
  );
}

export async function getServerSideProps(){
  
  await mongooseConnect();
  const featuredSchedule = await Schedule.findOne({}, null, { sort: { 'createdAt': -1 } });
  const cricketCategory = await Category.findOne({ name: 'Cricket' });
  const footballCategory = await Category.findOne({ name: 'Football' });
  const ufcCategory = await Category.findOne({ name: 'UFC' });
   const nationalCategory = await Category.findOne({ name: 'NationalGames' });
    const formulaCategory = await Category.findOne({ name: 'Formula1' });
     const copaCategory = await Category.findOne({ name: 'CopaAmerica' });
     const eplCategory = await Category.findOne({ name: 'English_Premier_League' });
      const uefaCategory = await Category.findOne({ name: 'UEFA_Champions_League' });
       const fifaCategory = await Category.findOne({ name: 'FIFA_Worldcup' });
        const iccwcCategory = await Category.findOne({ name: 'ICC_Cricket_Worldcup' });
         const icctestCategory = await Category.findOne({ name: 'ICC_World_Test_Championship' });
          const asiacupCategory = await Category.findOne({ name: 'Asia_Cup' });
           const icct20Category = await Category.findOne({ name: 'ICC_T20_Worldcup' });
            const euroCategory = await Category.findOne({ name: 'Euro_Cup' });









    






// Use the ObjectId in your query
const liveSchedule = await Schedule.find({
  $or: [
    { categories: cricketCategory._id }, // Match documents with category 'Cricket'
    { 'categories.parent': cricketCategory._id } // Match documents with subcategory 'Cricket'
  ]
})
.sort({ '_id': -1 })
.limit(10);
const footballSchedule = await Schedule.find({
  $or: [
    { categories: footballCategory._id }, // Match documents with category 'football'
    { 'categories.parent': footballCategory._id }
  ]
})
.sort({ '_id': -1 })
.limit(10);

 // const liveSchedule = await Schedule.find({categories: 'Cricket'}, null, {sort: {'_id':-1}, limit:10});
 const crickethighlight = await Highlight.find({
  $or: [
    { categories: cricketCategory._id }, // Match documents with category 'Cricket'
    { 'categories.parent': cricketCategory._id } // Match documents with subcategory 'Cricket'
  ]
})
.sort({ '_id': -1 })
.limit(10);
const footballhighlight = await Highlight.find({
  $or: [
    { categories: footballCategory._id }, // Match documents with category 'Cricket'
    { 'categories.parent': footballCategory._id } // Match documents with subcategory 'Cricket'
  ]
})
.sort({ '_id': -1 })
.limit(10);
const ufchighlight = await Highlight.find({
  $or: [
    { categories: ufcCategory._id }, // Match documents with category 'Cricket'
    { 'categories.parent': ufcCategory._id } // Match documents with subcategory 'Cricket'
  ]
})
.sort({ '_id': -1 })
.limit(10);
const national = await Schedule.find({
  $or: [
    { categories: nationalCategory._id }, // Match documents with category 'national'
    { 'categories.parent': nationalCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
const copa = await Schedule.find({
  $or: [
    { categories: copaCategory._id }, // Match documents with category 'copa'
    { 'categories.parent': copaCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
 const euro = await Schedule.find({
  $or: [
    { categories: euroCategory._id }, // Match documents with category 'copa'
    { 'categories.parent': euroCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
const epl = await Schedule.find({
  $or: [
    { categories: eplCategory._id }, // Match documents with category 'epl'
    { 'categories.parent': eplCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
 const uefa = await Schedule.find({
  $or: [
    { categories: uefaCategory._id }, // Match documents with category 'uefa'
    { 'categories.parent': uefaCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
  const fifa = await Schedule.find({
  $or: [
    { categories: fifaCategory._id }, // Match documents with category 'fifa'
    { 'categories.parent': fifaCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
  const iccwc = await Schedule.find({
  $or: [
    { categories: iccwcCategory._id }, // Match documents with category 'ICC Cricket Worldcup'
    { 'categories.parent': iccwcCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
  const icctest = await Schedule.find({
  $or: [
    { categories: icctestCategory._id }, // Match documents with category 'ICC Cricket Worldcup'
    { 'categories.parent': icctestCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
  const asiacup = await Schedule.find({
  $or: [
    { categories: asiacupCategory._id }, // Match documents with category 'Asia Cup'
    { 'categories.parent': asiacupCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
  const icct20 = await Schedule.find({
  $or: [
    { categories: icct20Category._id }, // Match documents with category 'ICC T20 WorldCup'
    { 'categories.parent': icct20Category._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
 const formula = await Schedule.find({
  $or: [
    { categories: formulaCategory._id }, // Match documents with category 'formula1'
    { 'categories.parent': formulaCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);

  return {
    props: 
    {
      featuredSchedule: JSON.parse(JSON.stringify(featuredSchedule)),
      liveSchedule: JSON.parse(JSON.stringify(liveSchedule)),
      footballSchedule: JSON.parse(JSON.stringify(footballSchedule)),
      footballhighlight: JSON.parse(JSON.stringify(footballhighlight)),
      ufchighlight: JSON.parse(JSON.stringify(ufchighlight)),
       national: JSON.parse(JSON.stringify(national)),
      formula: JSON.parse(JSON.stringify(formula)),
      copa: JSON.parse(JSON.stringify(copa)),
       epl: JSON.parse(JSON.stringify(epl)),
        uefa: JSON.parse(JSON.stringify(uefa)),
       fifa: JSON.parse(JSON.stringify(fifa)),
      euro: JSON.parse(JSON.stringify(euro)),
       iccwc: JSON.parse(JSON.stringify(iccwc)),
     icctest: JSON.parse(JSON.stringify(icctest)),
      asiacup: JSON.parse(JSON.stringify(asiacup)),
      icct20: JSON.parse(JSON.stringify(icct20)),



     
                    
      crickethighlight: JSON.parse(JSON.stringify(crickethighlight))},




    }

  

  };
