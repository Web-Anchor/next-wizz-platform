import Link from 'next/link';

// https://github.com/gilbarbara/logos/tree/main/logos

export default function Logo() {
  return (
    <Link href="/" className="inline-flex">
      <svg
        width="96px"
        height="20px"
        viewBox="0 0 512 90"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
      >
        <g fill="#FFA500">
          <path
            d="M33.8296697,8.89657981 L40.0062761,26.9589035 L29.0413831,58.5927613 C33.3756325,59.299671 37.7615897,59.6410844 42.1525051,59.6127513 C45.1713923,59.6184179 48.1888628,59.4597528 51.1907502,59.1381726 L54.9590467,70.8822246 C50.8932531,71.2930539 46.4591297,71.590551 42.2091712,71.590551 C36.5609764,71.5763845 30.9212814,71.1698051 25.3297527,70.3722296 L19.0752304,88.7037173 L0,88.7037173 L29.8347087,8.89657981 L33.8296697,8.89657981 Z"
            fillOpacity="0.6"
          ></path>
          <path d="M481.258218,26.9589035 C500.46803,26.9589035 511.999585,35.9192326 511.999585,58.5290119 C511.999585,61.3623176 511.921669,64.4364542 511.850836,64.8402003 L467.622934,64.8402003 C467.545019,73.9421947 475.287026,77.9159059 487.363992,77.9159059 C495.495579,77.9159059 501.976766,76.0175911 506.34714,74.7284371 L507.055466,86.5433217 C503.435918,87.8962252 495.601828,89.8654494 484.906099,89.8654494 C463.705889,89.8937057 449.234781,82.0879485 449.234781,58.4581793 C449.234781,43.1866617 455.262638,33.0009278 467.467103,28.9209676 L467.467103,53.7123923 L493.993927,53.7123923 C494.06476,42.712083 489.850217,37.9592127 480.734056,37.9592127 C476.484098,37.9592127 473.346212,38.9792028 471.164567,41.1537649 L471.164567,27.9080609 C474.488742,27.2549839 477.870293,26.9369453 481.258218,26.9589035 Z M201.561365,2.30914412 L201.561365,58.5290119 C201.561365,70.570561 204.047591,77.944239 214.821236,77.944239 C225.594881,77.944239 228.909848,70.5422279 228.909848,58.5290119 C228.909848,46.5157959 225.594881,39.1067015 214.821236,39.1067015 C210.302113,39.1067015 207.284643,40.3958556 205.251746,42.7758324 L205.251746,30.8263657 C208.715462,28.6518036 213.390417,27.2280675 219.793687,27.2280675 C236.071028,27.2280675 246.688841,36.5283934 246.688841,58.4581793 C246.688841,80.4162982 236.063945,89.6245416 219.644939,89.6245416 C209.473372,89.6245416 203.594262,86.0829095 200.279295,81.5425372 L199.450553,88.6753842 L184.009037,88.6753842 L184.009037,13.9894467 L176.167863,13.9894467 L176.167863,2.30914412 L201.561365,2.30914412 Z M332.722168,27.4193156 C343.042484,27.4193156 348.921593,31.0176138 352.158645,35.5650694 L353.065303,28.0922257 L368.435986,28.0922257 L368.457236,88.6753842 L350.897824,88.6753842 L350.897824,58.5290119 C350.897824,46.4874628 348.411598,39.1067015 337.637954,39.1067015 C326.864309,39.1067015 323.549341,46.5087126 323.549341,58.5290119 C323.549341,70.5493112 326.864309,77.9159059 337.637954,77.9159059 C342.164159,77.9159059 345.174547,76.6267519 347.207443,74.2538584 L347.207443,86.068743 C343.743727,88.2362219 338.99794,89.6103751 332.665502,89.6103751 C316.246496,89.6103751 305.749098,80.4446313 305.749098,58.5148454 C305.749098,36.5850595 316.225246,27.4193156 332.722168,27.4193156 Z M55.3061267,8.89657981 L85.1408354,88.6753842 L65.1731137,88.6753842 L37.9733793,8.89657981 L55.3061267,8.89657981 Z M112.6239,28.1063923 L112.6239,76.9809151 L119.707165,76.9809151 L119.707165,88.6753842 L95.0928216,88.6753842 L95.0928216,39.8008614 L87.2587314,39.8008614 L87.2587314,28.1063923 L112.6239,28.1063923 Z M169.870841,27.0226528 C171.554533,27.0070697 173.235392,27.1664431 174.885793,27.4972315 L174.659128,41.3520963 C173.242475,41.210431 171.34416,41.075849 169.700843,41.075849 C164.501727,41.075849 160.811347,42.3012537 158.247205,44.1995685 C152.578064,48.3933668 152.375595,56.1833131 152.368364,60.4434454 L152.368096,88.6753842 L134.879516,88.6753842 L134.879516,39.8008614 L127.038343,39.8008614 L127.038343,28.1063923 L150.321032,28.1063923 L151.454355,37.8175474 C154.620574,31.6409411 160.4926,27.0226528 169.870841,27.0226528 Z M296.873768,27.0226528 C298.569502,27.0049447 300.261693,27.1636098 301.924136,27.4972315 L301.697471,41.3520963 C300.280818,41.210431 298.382503,41.075849 296.739186,41.075849 C291.54007,41.075849 287.84969,42.3012537 285.285548,44.1995685 C279.623237,48.3933668 279.421012,56.1833131 279.413789,60.4434454 L279.413522,88.6753842 L261.917859,88.6753842 L261.917859,39.8008614 L254.076686,39.8008614 L254.076686,28.1063923 L277.359375,28.1063923 L278.492698,37.8175474 C281.658917,31.6409411 287.530943,27.0226528 296.873768,27.0226528 Z M402.591486,2.30914412 L402.591486,88.6753842 L385.039157,88.6753842 L385.039157,13.9894467 L377.205067,13.9894467 L377.205067,2.30914412 L402.591486,2.30914412 Z M444.878573,28.0780592 L423.38795,56.3544498 L447.577297,88.6753842 L427.007498,88.6753842 L403.873557,56.6661134 L425.045433,28.0780592 L444.878573,28.0780592 Z M103.07566,0 C108.501441,0 112.496402,3.54163209 112.496402,8.42200111 C112.496402,13.3023701 108.501441,16.8369189 103.07566,16.8369189 C97.6498799,16.8369189 93.6620022,13.3094534 93.6620022,8.42200111 L93.6407524,8.42200111 C93.6620022,3.54163209 97.6498799,0 103.07566,0 Z"></path>
        </g>
      </svg>
    </Link>
  );
}
