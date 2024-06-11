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
import IccLive from "@/components/Live/cricket/ICC_WC/IccLive";
import IccTestLive from "@/components/Live/cricket/ICC_Test/IccTestLive";
import AsiaLive from "@/components/Live/cricket/Asia_Cup/AsiaLive";
import IccT20Live from "@/components/Live/cricket/ICC_T20/IccT20Live";

export default function HomePage({liveSchedule,iccwc,
  icctest,
  asiacup,
  icct20}) {
 
   return(

    <div> 
      <Header />
      
      <Live schedule={liveSchedule} />
     {icct20.length > 0 && <IccT20Live icct20={icct20} />}
      {asiacup.length > 0 && <AsiaLive asiacup={asiacup} />}
      {iccwc.length > 0 && <IccLive iccwc={iccwc} />}
      {icctest.length > 0 && <IccTestLive icctest={icctest} />}
      
      <Footer />
    </div>
  );
}

export async function getServerSideProps(){
  
  await mongooseConnect();
  const featuredSchedule = await Schedule.findOne({}, null, { sort: { 'createdAt': -1 } });
  const cricketCategory = await Category.findOne({ name: 'Cricket' });
  const footballCategory = await Category.findOne({ name: 'Football' });
  iccwcCategory = await Category.findOne({ name: 'ICC_Cricket_Worldcup' });
    icctestCategory = await Category.findOne({ name: 'ICC_World_Test_Championship' });
    asiacupCategory = await Category.findOne({ name: 'Asia_Cup' });
    icct20Category = await Category.findOne({ name: 'ICC_T20_Worldcup' });


// Use the ObjectId in your query
const liveSchedule = await Schedule.find({
  $or: [
    { categories: cricketCategory._id }, // Match documents with category 'Cricket'
    { 'categories.parent': cricketCategory._id } // Match documents with subcategory 'Cricket'
  ]
})
.sort({ '_id': -1 })
.limit(10);
 const iccwc = await Schedule.find({
      $or: [
        { categories: iccwcCategory._id },
        { 'categories.parent': iccwcCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const icctest = await Schedule.find({
      $or: [
        { categories: icctestCategory._id },
        { 'categories.parent': icctestCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const asiacup = await Schedule.find({
      $or: [
        { categories: asiacupCategory._id },
        { 'categories.parent': asiacupCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const icct20 = await Schedule.find({
      $or: [
        { categories: icct20Category._id },
        { 'categories.parent': icct20Category._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

  return {
    props: 
    {
      featuredSchedule: JSON.parse(JSON.stringify(featuredSchedule)),
      liveSchedule: JSON.parse(JSON.stringify(liveSchedule)),
      footballSchedule: JSON.parse(JSON.stringify(footballSchedule)),
 iccwc: JSON.parse(JSON.stringify(iccwc)),
        icctest: JSON.parse(JSON.stringify(icctest)),
        asiacup: JSON.parse(JSON.stringify(asiacup)),
        icct20: JSON.parse(JSON.stringify(icct20)),
      highlight: JSON.parse(JSON.stringify(highlight))},


    }
  

  };
