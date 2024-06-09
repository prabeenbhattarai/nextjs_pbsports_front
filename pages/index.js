import Highlights from "@/components/Highlight/CricketHighlights";
import Featured from "@/components/Layout/Featured";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Live from "@/components/Live/Live";


import { mongooseConnect } from "@/lib/mongoose";
import { Highlight } from "@/models/Highlight";
import { Schedule } from "@/models/Schedule";
import { Category } from "@/models/Category";
import FootballLive from "@/components/Live/FootballLive";
import FootballHighlights from "@/components/Highlight/Footballhighlights";
import UfcHighlights from "@/components/Highlight/Ufchighlights";
import CricketHighlights from "@/components/Highlight/CricketHighlights";
import NationalLive from "@/components/Live/NationalGames/NationalLive";



export default function HomePage({featuredSchedule,liveSchedule,crickethighlight, footballSchedule, footballhighlight, ufchighlight,national}) {
 
   return(

    <div> 
      <Header />
      <Featured  schedule={featuredSchedule}/> // Featured Title in Banner
      <Live schedule={liveSchedule} /> // Cricket upcomg schedule
      <FootballLive football={footballSchedule}/> // football upcoming events
        <NationalLive national={national}/> // national upcoming events
<CricketHighlights crickethighlight ={crickethighlight}/> //Cricket Highlight
      <FootballHighlights footballhighlight={footballhighlight} /> // Football Highlights
      <UfcHighlights ufchighlight ={ufchighlight} /> // UFC Highlights

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

  return {
    props: 
    {
      featuredSchedule: JSON.parse(JSON.stringify(featuredSchedule)),
      liveSchedule: JSON.parse(JSON.stringify(liveSchedule)),
      footballSchedule: JSON.parse(JSON.stringify(footballSchedule)),
      footballhighlight: JSON.parse(JSON.stringify(footballhighlight)),
      ufchighlight: JSON.parse(JSON.stringify(ufchighlight)),
           national: JSON.parse(JSON.stringify(national)),



      crickethighlight: JSON.parse(JSON.stringify(crickethighlight))},




    }

  

  };
