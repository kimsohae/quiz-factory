export const RANKS = ["stone", "desert", "grass", "plant", "rice", "jungle"] as const;
export type Rank = typeof RANKS[number];



/**
 *
 * @param score
 * @returns rank
 *
 * score 0-1 : stone
 * score 2-3 : desert
 * score 4-5 : grass
 * score 6-7 : plant
 * score 8-9 : rice
 * score 10  : jungle
 */


 export function getRank(score: number): Rank {
    if (score <= 1) {
      return "stone";
    } else if (score <= 3) {
      return "desert";
    } else if (score <= 5) {
      return "grass";
    } else if (score <= 7) {
      return "plant";
    } else if (score <= 9) {
      return "rice";
    } else if (score <= 10) {
      return "jungle";
    }
    return "stone";
  }
  


export const RESULT_MAP: {
    [key in Rank]: { desc: string; title: string };
  } = {
    stone: {
      desc: "돌 틈 사이에도 희망이 자랄 수 있죠! \n아마도...?",
      title: "씨앗 품은 돌머리",
    },
    desert: {
      desc: "여기저기 균열이...!\n경제 지식이 싹틀 조짐이 보입니다.",
      title: "아직은 황무지머리",
    },
    grass: {
      desc: "지식이 자라나고 있지만,\n 아직 사막입니다.",
      title: "오아시스의 잔디 머리",
    },
    plant: {
      desc: "머리를 꽤 심어놓았네요.\n 물만 잘 주면 될듯!",
      title: "희망찬 모내기 머리",
    },
    rice: {
      desc: "경제지식이 무르익었네요.\n 추수의 계절이 다가오고 있습니다!",
      title: "가을볕의 벼머리",
    },
    jungle: {
      desc: "머리가 이렇게 풍성할 수 있나요?\n대단합니다!",
      title: "수풀 가득한 정글머리",
    },
  };