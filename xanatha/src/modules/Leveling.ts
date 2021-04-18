import { MemberAttributes } from '../database/models/Member';
import { ProfileAttributes } from '../database/models/Profile';
import ProgressBar from '@xetha/progressbar';

const LvlChart: number[] = [];
const ReqLvlChart: number[] = [];
const maxLevel = 200;

for (let i = 0; i <= maxLevel; i++) {
    ReqLvlChart.push(15 * (i * i) + 50 * i + 150);

    if (i === 0) {
        LvlChart.push(i);
    } else if (i === 1) {
        LvlChart.push(ReqLvlChart[0]);
    } else if (i === 2) {
        LvlChart.push(ReqLvlChart[0] + ReqLvlChart[1]);
    } else {
        LvlChart.push(LvlChart[i - 1] + ReqLvlChart[i - 1]);
    }
}

type UserXP = MemberAttributes | ProfileAttributes;

export default class Leveling {
    static maxLevel: typeof maxLevel = maxLevel;
    static LevelChart: typeof LvlChart = LvlChart;
    static RequireedLevelChart: typeof ReqLvlChart = ReqLvlChart;

    static level(member: UserXP) {
        for (let i = 0; i <= Leveling.maxLevel; i++) {
            if (
                member.experience >= Leveling.LevelChart[i] &&
                member.experience <= Leveling.LevelChart[i + 1]
            ) {
                return i;
            }
        }
    }

    static levelxp(member: UserXP) {
        return Leveling.LevelChart[Leveling.level(member)];
    }

    static nextlevel(member: UserXP) {
        return Leveling.level(member) + 1;
    }

    static nextlevelxp(member: UserXP) {
        return Leveling.LevelChart[Leveling.nextlevel(member)];
    }

    static progress(member: UserXP) {
        return (
            ((member.experience - Leveling.levelxp(member)) /
                (Leveling.nextlevelxp(member) - Leveling.levelxp(member))) *
            100
        );
        // (xp - lxp / nxp - lxp) * 100 = n
    }

    static progressbar(member: UserXP) {
        return ProgressBar(Leveling.progress(member), 20);
    }

    static progressXP(member: UserXP) {
        return Leveling.nextlevelxp(member) - member.experience;
    }
}
