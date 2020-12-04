//set Colors
function fillerStroker(c) {
   switch (c) {
      case "disable":
         Filler = "rgba(0,0,0,0.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "white":
         Filler = "rgba(255,255,255,1.0)";
         Stroker = "rgba(0,0,0,1.0)";
         break;
      case "ship":
         Filler = "rgba(26,26,26,1.0)";
         Stroker = "rgba(255,255,255,0.1)";
         break;
      case "shipOver":
         Filler = "rgba(100,100,100,1.0)";
         Stroker = "rgba(255,255,255,0.1)";
         break;
      case "shipDown":
         Filler = "rgba(50,50,50,1.0)";
         Stroker = "rgba(255,255,255,0.1)";
         break;
      case "shipUp":
         Filler = "rgba(100,100,100,1.0)";
         Stroker = "rgba(255,255,255,0.1)";
         break;
      case "blackPieceStroke":
         Filler = "rgba(0,0,0,0.0)";
         Stroker = "rgba(0,0,0,1.0)";
         break;
      case "whitePieceStrokeTransp":
         Filler = "rgba(255,255,255,0.0)";
         Stroker = "rgba(255,255,255,0.3)";
         break;
      case "blackPieceStrokeTransp":
         Filler = "rgba(0,0,0,0.0)";
         Stroker = "rgba(0,0,0,0.3)";
         break;
      case "whitePieceFill":
         Filler = "rgba(255,255,255,1.0)";
         Stroker = "rgba(255,255,255,0.0)";
         break;
      case "blackPieceFill":
         Filler = "rgba(0,0,0,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "whitePieceFillTransp":
         Filler = "rgba(255,255,255,0.3)";
         Stroker = "rgba(255,255,255,0.0)";
         break;
      case "blackPieceFillTransp":
         Filler = "rgba(0,0,0,0.3)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "black":
         Filler = "rgba(0,0,0,1.0)";
         Stroker = "rgba(255,255,255,1.0)";
         break;
      case "whiteloser":
         Filler = "rgba(255,255,255,0.5)";
         Stroker = "rgba(0,0,0,0.5)";
         break;
      case "blackloser":
         Filler = "rgba(0,0,0,0.5)";
         Stroker = "rgba(255,255,255,0.5)";
         break;
      case "textColorWhite":
         Filler = "rgba(250,250,250,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "textColorOver":
         Filler = "rgba(0,150,0,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "blackSquare":
         Filler = "rgba(102, 153, 51, 1.0)";
         Stroker = "rgba(102, 153, 51, 1.0)";
         break;
      case "whiteSquare":
         Filler = "rgba(210,225,195,1.0)";
         Stroker = "rgba(210,225,195,1.0)";
         break;
      case "blackSquareMini":
         Filler = "rgba(115, 100, 90, 1.0)";
         Stroker = "rgba(115, 100, 90, 1.0)";
         break;
      case "whiteSquareMini":
         Filler = "rgba(210,200,180,1.0)";
         Stroker = "rgba(210,200,180,1.0)";
         break;
      case "turnover":
         Filler = "rgba(0,200,200,0.5)";
         Stroker = "rgba(0,0,0,0.3)";
         break;
      case "empty":
         Filler = "rgba(200,200,200,0.5)";
         Stroker = "rgba(0,0,0,0.3)";
         break;
      case "take":
         Filler = "rgba(255,50,50,0.5)";
         Stroker = "rgba(255,50,50,0.5)";
         break;
      case "mate":
         Filler = "rgba(255,0,0,0.9)";
         Stroker = "rgba(100,0,0,0.9)";
         break;
      case "castleCheck":
         Filler = "rgba(255,0,0,1.0)";
         Stroker = "rgba(255,0,0,1.0)";
         break;
      case "square":
         Filler = "rgba(0,50,100,0.5)";
         Stroker = "rgba(0,0,0,0.3)";
         break;
      case "beacon":
         Filler = "rgba(143,19,233,0.7)";
         Stroker = "rgba(143,19,233,0.5)";
         break;
      case "greenColor":
         Filler = "rgba(100,240,100,1.0)";
         Stroker = "rgba(100,240,100,1.0)";
         break;
      case "greyColor":
         Filler = "rgba(140,140,140,1.0)";
         Stroker = "rgba(140,140,140,1.0)";
         break;
      case "greyColorStroke":
         Filler = "rgba(140,140,140,0.0)";
         Stroker = "rgba(140,140,140,1.0)";
         break;
      case "iceWhiteColor":
         Filler = "rgba(230,230,225,1.0)";
         Stroker = "rgba(230,230,225,1.0)";
         break;
      case "lightWhiteColor":
         Filler = "rgba(255,250,255,1.0)";
         Stroker = "rgba(255,250,255,1.0)";
         break;
      case "lightWhiteColorStroke":
         Filler = "rgba(255,250,255,0.0)";
         Stroker = "rgba(255,250,255,1.0)";
         break;
      case "mMove":
         Filler = "rgba(255,200,0,0.8)";
         Stroker = "rgba(255,200,0,0.0)";
         break;
      case "bgBlackTransp":
         Filler = "rgba(31,31,31,0.3)";
         Stroker = "rgba(31,31,31,0.3)";
         break;
      case "blackTransp":
         Filler = "rgba(100,100,100,0.1)";
         Stroker = "rgba(100,100,100,0.1)";
         break;
      case "lettererBoard":
         Filler = "rgba(0,0,0,0.4)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "lettererBlackText":
         Filler = "rgba(0,0,0,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "lettererWhiteText":
         Filler = "rgba(250,250,250,1.0)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "lettererWhiteTextTransp":
         Filler = "rgba(250,250,250,0.3)";
         Stroker = "rgba(0,0,0,0.0)";
         break;
      case "ColorMarkerOh":
         Filler = "rgba(50,100,50,1.0)";
         Stroker = "rgba(50,100,50,1.0)";
         break;
      case "ColorMarkerWhite":
         Filler = "rgba(130,80,0,1.0)";
         Stroker = "rgba(130,80,0,1.0)";
         break;
      case "ColorMarkerBlack":
         Filler = "rgba(50,50,100,1.0)";
         Stroker = "rgba(50,50,100,1.0)";
         break;
      case "belt16":
         //fall through
      case "belt15":
         //fall through
      case "belt14":
         //fall through
      case "belt13":
         //fall through
      case "belt12":
         //fall through
      case "belt11":
         //fall through
      case "belt10":
         Filler = "rgba(160,150,100,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "belt9":
         Filler = "rgba(130,150,40,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "belt8":
         Filler = "rgba(160,100,10,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "belt7":
         Filler = "rgba(0,50,140,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "belt6":
         Filler = "rgba(120,0,0,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "belt5":
         Filler = "rgba(50,0,50,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "belt4":
         Filler = "rgba(255,255,0,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "belt3":
         Filler = "rgba(255,200,0,1.0)";
         Stroker = "rgba(100,100,100,0.9)";
         break;
      case "belt2":
         Filler = "rgba(255,100,0,1.0)";
         Stroker = "rgba(255,100,0,0.9)";
         break;
      case "belt1":
         Filler = "rgba(255,0,0,1.0)";
         Stroker = "rgba(255,0,0,0.9)";
         break;
      case "belt0":
         Filler = "rgba(200,0,0,1.0)";
         Stroker = "rgba(200,0,0,0.9)";
         break;
   }
}
