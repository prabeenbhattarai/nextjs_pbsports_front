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







export default function HomePage({featuredSchedule,liveSchedule,crickethighlight, footballSchedule, footballhighlight, ufchighlight,national,formula,copa,epl}) {
 
   return(

    <div> 
      <Header />
      <Featured  schedule={featuredSchedule}/> 
      <Live schedule={liveSchedule} />
      <FootballLive football={footballSchedule}/> 
    <CopaLive copa={copa}/>
    <EplLive epl={epl}/>  
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
     const copaCategory = await Category.findOne({ name: 'Copa America' });
     const eplCategory = await Category.findOne({ name: 'English Premier League' });


    






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
    { categories: footballCategory._id }, // Match documents with category 'Cricket'
    { 'categories.parent': footballCategory._id } // Match documents with subcategory 'Cricket'
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
    { categories: nationalCategory._id }, // Match documents with category 'Cricket'
    { 'categories.parent': nationalCategory._id } // Match documents with subcategory 'Cricket'
  ]
})
.sort({ '_id': -1 })
.limit(10);
 const formula = await Schedule.find({
  $or: [
    { categories: formulaCategory._id }, // Match documents with category 'Cricket'
    { 'categories.parent': formulaCategory._id } // Match documents with subcategory 'Cricket'
  ]
})
.sort({ '_id': -1 })
.limit(10);
const copa = await Schedule.find({
  $or: [
    { categories: copaCategory._id }, // Match documents with category 'Copa America'
    { 'categories.parent': copaCategory._id } 
  ]
})
.sort({ '_id': -1 })
.limit(10);
const epl = await Schedule.find({
  $or: [
    { categories: eplCategory._id }, // Match documents with category 'EPL'
    { 'categories.parent': eplCategory._id } 
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
                    
      crickethighlight: JSON.parse(JSON.stringify(crickethighlight))},




    }

  

  };
