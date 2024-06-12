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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px', // Adjust gap between components
  },
};

export default function HomePage({
  featuredSchedule,
  liveSchedule,
  crickethighlight,
  footballSchedule,
  footballhighlight,
  ufchighlight,
  national,
  formula,
  copa,
  epl,
  uefa,
  euro,
  fifa,
  iccwc,
  icctest,
  asiacup,
  icct20,
}) {
  return (
    <div style={styles.container}>
      <Header />
      <Featured schedule={featuredSchedule} />
      {liveSchedule.length > 0 && <Live schedule={liveSchedule} />}
      {icct20.length > 0 && <IccT20Live icct20={icct20} />}
      {asiacup.length > 0 && <AsiaLive asiacup={asiacup} />}
      {iccwc.length > 0 && <IccLive iccwc={iccwc} />}
      {icctest.length > 0 && <IccTestLive icctest={icctest} />}
      {footballSchedule.length > 0 && <FootballLive football={footballSchedule} />}
      {fifa.length > 0 && <FifaLive fifa={fifa} />}
      {copa.length > 0 && <CopaLive copa={copa} />}
      {euro.length > 0 && <EuroLive euro={euro} />}
      {epl.length > 0 && <EplLive epl={epl} />}
      {uefa.length > 0 && <UefaLive uefa={uefa} />}
      {national.length > 0 && <NationalLive national={national} />}
      {formula.length > 0 && <FormulaLive formula={formula} />}
  
      {crickethighlight.length > 0 && <CricketHighlights crickethighlight={crickethighlight} />}
      {footballhighlight.length > 0 && <FootballHighlights footballhighlight={footballhighlight} />}
      {ufchighlight.length > 0 && <UfcHighlights ufchighlight={ufchighlight} />}
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  let featuredSchedule = null;
  let cricketCategory = null;
  let footballCategory = null;
  let ufcCategory = null;
  let nationalCategory = null;
  let formulaCategory = null;
  let copaCategory = null;
  let eplCategory = null;
  let uefaCategory = null;
  let fifaCategory = null;
  let iccwcCategory = null;
  let icctestCategory = null;
  let asiacupCategory = null;
  let icct20Category = null;
  let euroCategory = null;

  try {
    featuredSchedule = await Schedule.findOne({}, null, { sort: { createdAt: -1 } });
    cricketCategory = await Category.findOne({ name: 'Cricket' });
    footballCategory = await Category.findOne({ name: 'Football' });
    ufcCategory = await Category.findOne({ name: 'UFC' });
    nationalCategory = await Category.findOne({ name: 'NationalGames' });
    formulaCategory = await Category.findOne({ name: 'Formula1' });
    copaCategory = await Category.findOne({ name: 'CopaAmerica' });
    eplCategory = await Category.findOne({ name: 'English_Premier_League' });
    uefaCategory = await Category.findOne({ name: 'UEFA_Champions_League' });
    fifaCategory = await Category.findOne({ name: 'FIFA_Worldcup' });
    iccwcCategory = await Category.findOne({ name: 'ICC_Cricket_Worldcup' });
    icctestCategory = await Category.findOne({ name: 'ICC_World_Test_Championship' });
    asiacupCategory = await Category.findOne({ name: 'Asia_Cup' });
    icct20Category = await Category.findOne({ name: 'ICC_T20_Worldcup' });
    euroCategory = await Category.findOne({ name: 'Euro_Cup' });

    const liveSchedule = await Schedule.find({
      $or: [
        { categories: cricketCategory._id },
        { 'categories.parent': cricketCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const footballSchedule = await Schedule.find({
      $or: [
        { categories: footballCategory._id },
        { 'categories.parent': footballCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const crickethighlight = await Highlight.find({
      $or: [
        { categories: cricketCategory._id },
        { 'categories.parent': cricketCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const footballhighlight = await Highlight.find({
      $or: [
        { categories: footballCategory._id },
        { 'categories.parent': footballCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const ufchighlight = await Highlight.find({
      $or: [
        { categories: ufcCategory._id },
        { 'categories.parent': ufcCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const national = await Schedule.find({
      $or: [
        { categories: nationalCategory._id },
        { 'categories.parent': nationalCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const copa = await Schedule.find({
      $or: [
        { categories: copaCategory._id },
        { 'categories.parent': copaCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const euro = await Schedule.find({
      $or: [
        { categories: euroCategory._id },
        { 'categories.parent': euroCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const epl = await Schedule.find({
      $or: [
        { categories: eplCategory._id },
        { 'categories.parent': eplCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const uefa = await Schedule.find({
      $or: [
        { categories: uefaCategory._id },
        { 'categories.parent': uefaCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    const fifa = await Schedule.find({
      $or: [
        { categories: fifaCategory._id },
        { 'categories.parent': fifaCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

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

    const formula = await Schedule.find({
      $or: [
        { categories: formulaCategory._id },
        { 'categories.parent': formulaCategory._id }
      ]
    }).sort({ '_id': -1 }).limit(100);

    return {
      props: {
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
        crickethighlight: JSON.parse(JSON.stringify(crickethighlight)),
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        featuredSchedule: [],
        liveSchedule: [],
        footballSchedule: [],
        footballhighlight: [],
        ufchighlight: [],
        national: [],
        formula: [],
        copa: [],
        epl: [],
        uefa: [],
        fifa: [],
        euro: [],
        iccwc: [],
        icctest: [],
        asiacup: [],
        icct20: [],
        crickethighlight: [],
      }
    };
  }
}
