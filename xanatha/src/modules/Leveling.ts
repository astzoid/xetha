import ProgressBar from '@oadpoaw/progressbar';
import type { ProfileAttributes, MemberAttributes } from '@shared/database';

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

const Leveling = {
    maxLevel,
    LevelChart: LvlChart,
    RequiredLevelChart: ReqLvlChart,

    level(member: UserXP) {
        for (let i = 0; i <= Leveling.maxLevel; i++) {
            if (
                member.experience >= Leveling.LevelChart[i] &&
                member.experience <= Leveling.LevelChart[i + 1]
            ) {
                return i;
            }
        }
        return 0;
    },

    levelxp(member: UserXP) {
        return Leveling.LevelChart[Leveling.level(member)];
    },

    nextlevel(member: UserXP) {
        return Leveling.level(member) + 1;
    },

    nextlevelxp(member: UserXP) {
        return Leveling.LevelChart[Leveling.nextlevel(member)];
    },

    progress(member: UserXP) {
        return (
            ((member.experience - Leveling.levelxp(member)) /
                (Leveling.nextlevelxp(member) - Leveling.levelxp(member))) *
            100
        );
        // (xp - lxp / nxp - lxp) * 100 = n
    },

    progressbar(member: UserXP) {
        return ProgressBar(Leveling.progress(member), 20);
    },

    progressXP(member: UserXP) {
        return Leveling.nextlevelxp(member) - member.experience;
    },
};
export default Leveling;
