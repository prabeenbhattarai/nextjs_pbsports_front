import Highlights from "@/components/Highlight/Highlights";
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


export default function HomePage({featuredSchedule,liveSchedule,highlight, footballSchedule, footballhighlight}) {
 
   return(

    <div> 
      <Header />
     
      
     
      <Highlights highlight={highlight} />
      <FootballHighlights footballhighlight={footballhighlight} />

      <Footer />
    </div>
  );
}

export async function getServerSideProps(){
  
  await mongooseConnect();
  const featuredSchedule = await Schedule.findOne({}, null, { sort: { 'createdAt': -1 } });
  const cricketCategory = await Category.findOne({ name: 'Cricket' });
  const footballCategory = await Category.findOne({ name: 'Football' });


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

 // const liveSchedule = await Schedule.find({categories: 'Cricket'}, null, {sort: {'_id':-1}, limit:10});
  const highlight= await Highlight.find({},null, {sort:{'_id':-1}});


  return {
    props: 
    {
      featuredSchedule: JSON.parse(JSON.stringify(featuredSchedule)),
      liveSchedule: JSON.parse(JSON.stringify(liveSchedule)),
      footballSchedule: JSON.parse(JSON.stringify(footballSchedule)),
      footballhighlight: JSON.parse(JSON.stringify(footballhighlight)),


      highlight: JSON.parse(JSON.stringify(highlight))},


    }
  

  };
