import express from 'express';
const router = express.Router();

import MovieCertification from '../models/movie_certification.js';
import TvCertification from '../models/tv_certification.js';

import authMiddleware from '../middleware/auth.js';

router.get('/load-certrifications', authMiddleware, async (req, res) => {
    
      for (let cert in movieCertData){
        let certArr = movieCertData[cert];
        for (let certData of certArr){
            let movC = new MovieCertification({
                country:cert,
                certification:certData.certification,
                meaning:certData.meaning,
                order:certData.order
            });
            movC.save().then(() => {console.log('Mov Cert Saved.')}).catch(err => {console.error(err)});
        }
      }
      
      for (let cert in tvCertData){
        let certArr = tvCertData[cert];
        for (let certData of certArr){
            let tvC = new TvCertification({
                country:cert,
                certification:certData.certification,
                meaning:certData.meaning,
                order:certData.order
            });
            tvC.save().then(() => {console.log('TV Cert Saved.')}).catch(err => {console.error(err)});
        }
      }
    
      res.send('Completed');
});

let movieCertData = {
    "AU": [
      {
        "certification": "E",
        "meaning": "Exempt from classification. Films that are exempt from classification must not contain contentious material (i.e. material that would ordinarily be rated M or higher).",
        "order": 1
      },
      {
        "certification": "G",
        "meaning": "General. The content is very mild in impact.",
        "order": 2
      },
      {
        "certification": "PG",
        "meaning": "Parental guidance recommended. There are no age restrictions. The content is mild in impact.",
        "order": 3
      },
      {
        "certification": "M",
        "meaning": "Recommended for mature audiences. There are no age restrictions. The content is moderate in impact.",
        "order": 4
      },
      {
        "certification": "MA 15+",
        "meaning": "Mature Accompanied. Unsuitable for children younger than 15. Children younger than 15 years must be accompanied by a parent or guardian. The content is strong in impact.",
        "order": 5
      },
      {
        "certification": "R 18+",
        "meaning": "Restricted to 18 years and over. Adults only. The content is high in impact.",
        "order": 6
      },
      {
        "certification": "X 18+",
        "meaning": "Restricted to 18 years and over. Films with this rating have pornographic content. Films classified as X18+ are banned from being sold or rented in all Australian states and are only legally available in the Australian Capital Territory and the Northern Territory. However, importing X18+ material from the two territories to any of the Australian states is legal.The content is sexually explicit in impact.",
        "order": 7
      },
      {
        "certification": "RC",
        "meaning": "Refused Classification. Banned from sale or hire in Australia; also generally applies to importation (if inspected by and suspicious to Customs). Private Internet viewing is unenforced and attempts to legally censor such online material has resulted in controversy. Films are rated RC if their content exceeds the guidelines. The content is very high in impact.",
        "order": 8
      }
    ],
    "BG": [
      {
        "certification": "D",
        "meaning": "Prohibited for persons under 16.",
        "order": 4
      },
      {
        "certification": "X",
        "meaning": "Prohibited for persons under 18.",
        "order": 5
      },
      {
        "certification": "B",
        "meaning": "Without age restrictions.",
        "order": 2
      },
      {
        "certification": "C",
        "meaning": "Not recommended for children under 12.",
        "order": 3
      },
      {
        "certification": "A",
        "meaning": "Recommended for children.",
        "order": 1
      }
    ],
    "BR": [
      {
        "certification": "14",
        "meaning": "Not recommended for minors under fourteen. More violent material, stronger sex references and/or nudity.",
        "order": 4
      },
      {
        "certification": "16",
        "meaning": "Not recommended for minors under sixteen. Scenes featuring production, trafficking and/or use of illegal drugs, hyper-realistic sex, sexual violence, abortion, torture, mutilation, suicide, trivialization of violence and death penalty.",
        "order": 5
      },
      {
        "certification": "L",
        "meaning": "General Audiences. Do not expose children to potentially harmful content.",
        "order": 1
      },
      {
        "certification": "12",
        "meaning": "Not recommended for minors under twelve. Scenes can include physical aggression, use of legal drugs and sexual innuendo.",
        "order": 3
      },
      {
        "certification": "10",
        "meaning": "Not recommended for minors under ten. Violent content or inappropriate language to children, even if of a less intensity.",
        "order": 2
      },
      {
        "certification": "18",
        "meaning": "Not recommended for minors under eighteen. Scenes featuring explicit sex, incest, pedophilia, praising of the use of illegal drugs and violence of a strong imagery impact.",
        "order": 6
      }
    ],
    "CA": [
      {
        "certification": "G",
        "meaning": "All ages.",
        "order": 2
      },
      {
        "certification": "PG",
        "meaning": "Parental guidance advised. There is no age restriction but some material may not be suitable for all children.",
        "order": 3
      },
      {
        "certification": "14A",
        "meaning": "Persons under 14 years of age must be accompanied by an adult.",
        "order": 4
      },
      {
        "certification": "18A",
        "meaning": "Persons under 18 years of age must be accompanied by an adult. In the Maritimes & Manitoba, children under the age of 14 are prohibited from viewing the film.",
        "order": 5
      },
      {
        "certification": "R",
        "meaning": "Restricted to 18 years and over. No rental or purchase by those under 18. Content not suitable for minors. Video contains frequent use of: sexual activity; brutal/graphic violence; intense horror; and/or other disturbing content.",
        "order": 6
      },
      {
        "certification": "A",
        "meaning": "Admittance restricted to people 18 years of age or older. Sole purpose of the film is the portrayal of sexually explicit activity and/or explicit violence.",
        "order": 7
      },
      {
        "certification": "E",
        "meaning": "Exempt. Contains material not subject to classification such as documentaries, nature, travel, music, arts and culture, sports and educational and instructional information.",
        "order": 1
      }
    ],
    "CA-QC": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "G",
        "meaning": "General Rating – May be viewed, rented or purchased by persons of all ages. If a film carrying a \"G\" rating might offend the sensibilities of a child under 8 years of age, \"Not suitable for young children\" is appended to the classification.",
        "order": 1
      },
      {
        "certification": "13+",
        "meaning": "13 years and over – May be viewed, rented or purchased only by children 13 years of age or over. Children under 13 may be admitted only if accompanied by an adult.",
        "order": 2
      },
      {
        "certification": "16+",
        "meaning": "16 years and over – May be viewed, rented or purchased only by children 16 years of age or over.",
        "order": 3
      },
      {
        "certification": "18+",
        "meaning": "18 years and over – May be viewed, rented or purchased only by adults 18 years of age or over. If a film contains real and explicit sexual activity \"Explicit sexuality\" is appended to the classification, and in the retail video industry storeowners are required to place the film in a room reserved for adults.",
        "order": 4
      }
    ],
    "DE": [
      {
        "certification": "12",
        "meaning": "Children 12 or older admitted, children between 6 and 11 only when accompanied by parent or a legal guardian.",
        "order": 3
      },
      {
        "certification": "18",
        "meaning": "No youth admitted, only adults.",
        "order": 5
      },
      {
        "certification": "0",
        "meaning": "No age restriction.",
        "order": 1
      },
      {
        "certification": "6",
        "meaning": "No children younger than 6 years admitted.",
        "order": 2
      },
      {
        "certification": "16",
        "meaning": "Children 16 or older admitted, nobody under this age admitted.",
        "order": 4
      }
    ],
    "DK": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "A",
        "meaning": "Suitable for a general audience.",
        "order": 1
      },
      {
        "certification": "7",
        "meaning": "Not recommended for children under 7.",
        "order": 2
      },
      {
        "certification": "11",
        "meaning": "For ages 11 and up.",
        "order": 3
      },
      {
        "certification": "15",
        "meaning": "For ages 15 and up.",
        "order": 4
      },
      {
        "certification": "F",
        "meaning": "Exempt from classification.",
        "order": 5
      }
    ],
    "ES": [
      {
        "certification": "A",
        "meaning": "General admission.",
        "order": 1
      },
      {
        "certification": "Ai",
        "meaning": "General admission.",
        "order": 2
      },
      {
        "certification": "7",
        "meaning": "Not recommended for audiences under 7.",
        "order": 3
      },
      {
        "certification": "7i",
        "meaning": "Not recommended for audiences under 7.",
        "order": 4
      },
      {
        "certification": "12",
        "meaning": "Not recommended for audiences under 12.",
        "order": 5
      },
      {
        "certification": "16",
        "meaning": "Not recommended for audiences under 16.",
        "order": 5
      },
      {
        "certification": "18",
        "meaning": "Not recommended for audiences under 18.",
        "order": 7
      },
      {
        "certification": "X",
        "meaning": "Prohibited for audiences under 18.",
        "order": 8
      }
    ],
    "FI": [
      {
        "certification": "K-16",
        "meaning": "Over 16 years.",
        "order": 4
      },
      {
        "certification": "K-12",
        "meaning": "Over 12 years.",
        "order": 3
      },
      {
        "certification": "K-7",
        "meaning": "Over 7 years.",
        "order": 2
      },
      {
        "certification": "S",
        "meaning": "For all ages.",
        "order": 1
      },
      {
        "certification": "K-18",
        "meaning": "Adults only.",
        "order": 5
      },
      {
        "certification": "KK",
        "meaning": "Banned from commercial distribution.",
        "order": 6
      }
    ],
    "FR": [
      {
        "certification": "TP",
        "meaning": "Valid for all audiences.",
        "order": 1
      },
      {
        "certification": "12",
        "meaning": "Unsuitable for children younger than 12 or forbidden in cinemas for under 12.",
        "order": 2
      },
      {
        "certification": "16",
        "meaning": "Unsuitable for children younger than 16 or forbidden in cinemas for under 16.",
        "order": 3
      },
      {
        "certification": "18",
        "meaning": "Unsuitable for children younger than 18 or forbidden in cinemas for under 18.",
        "order": 4
      }
    ],
    "GB": [
      {
        "certification": "15",
        "meaning": "Only those over 15 years are admitted. Nobody younger than 15 can rent or buy a 15-rated VHS, DVD, Blu-ray Disc, UMD or game, or watch a film in the cinema with this rating. Films under this category can contain adult themes, hard drugs, frequent strong language and limited use of very strong language, strong violence and strong sex references, and nudity without graphic detail. Sexual activity may be portrayed but without any strong detail. Sexual violence may be shown if discreet and justified by context.",
        "order": 5
      },
      {
        "certification": "R18",
        "meaning": "Can only be shown at licensed adult cinemas or sold at licensed sex shops, and only to adults, those aged 18 or over. Films under this category are always hard-core pornography, defined as material intended for sexual stimulation and containing clear images of real sexual activity, strong fetish material, explicit animated images, or sight of certain acts such as triple simultaneous penetration and snowballing. There remains a range of material that is often cut from the R18 rating: strong images of injury in BDSM or spanking works, urolagnia, scenes suggesting incest even if staged, references to underage sex or childhood sexual development and aggressive behaviour such as hair-pulling or spitting on a performer are not permitted. More cuts are demanded in this category than any other category.",
        "order": 7
      },
      {
        "certification": "PG",
        "meaning": "All ages admitted, but certain scenes may be unsuitable for young children. May contain mild language and sex/drugs references. May contain moderate violence if justified by context (e.g. fantasy).",
        "order": 2
      },
      {
        "certification": "12A",
        "meaning": "Films under this category are considered to be unsuitable for very young people. Those aged under 12 years are only admitted if accompanied by an adult, aged at least 18 years, at all times during the motion picture. However, it is generally not recommended that children under 12 years should watch the film. Films under this category can contain mature themes, discrimination, soft drugs, moderate swear words, infrequent strong language and moderate violence, sex references and nudity. Sexual activity may be briefly and discreetly portrayed. Sexual violence may be implied or briefly indicated.",
        "order": 3
      },
      {
        "certification": "U",
        "meaning": "All ages admitted, there is nothing unsuitable for children.",
        "order": 1
      },
      {
        "certification": "18",
        "meaning": "Only adults are admitted. Nobody younger than 18 can rent or buy an 18-rated VHS, DVD, Blu-ray Disc, UMD or game, or watch a film in the cinema with this rating. Films under this category do not have limitation on the bad language that is used. Hard drugs are generally allowed, and explicit sex references along with detailed sexual activity are also allowed. Scenes of strong real sex may be permitted if justified by the context. Very strong, gory, and/or sadistic violence is usually permitted. Strong sexual violence is permitted unless it is eroticised or excessively graphic.",
        "order": 6
      },
      {
        "certification": "12",
        "meaning": "Home media only since 2002. 12A-rated films are usually given a 12 certificate for the VHS/DVD version unless extra material has been added that requires a higher rating. Nobody younger than 12 can rent or buy a 12-rated VHS, DVD, Blu-ray Disc, UMD or game. The content guidelines are identical to those used for the 12A certificate.",
        "order": 4
      }
    ],
    "HU": [
      {
        "certification": "6",
        "meaning": "Not recommended below age of 6.",
        "order": 2
      },
      {
        "certification": "16",
        "meaning": "Not recommended below age of 16.",
        "order": 4
      },
      {
        "certification": "KN",
        "meaning": "Without age restriction.",
        "order": 1
      },
      {
        "certification": "18",
        "meaning": "Not recommended below age of 18.",
        "order": 5
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "12",
        "meaning": "Not recommended below age of 12.",
        "order": 3
      },
      {
        "certification": "X",
        "meaning": "Restricted below 18, for adults only.",
        "order": 6
      }
    ],
    "IN": [
      {
        "certification": "U",
        "meaning": "Unrestricted Public Exhibition throughout India, suitable for all age groups. Films under this category should not upset children over 4. Such films may contain educational, social or family-oriented themes. Films under this category may also contain fantasy violence and/or mild bad language.",
        "order": 1
      },
      {
        "certification": "U/A 7+",
        "meaning": "Viewable for 7 and above years old.",
        "order": 2
      },
      {
        "certification": "UA",
        "meaning": "All ages admitted, but it is advised that children below 12 be accompanied by a parent as the theme or content may be considered intense or inappropriate for young children. Films under this category may contain mature themes, sexual references, mild sex scenes, violence with brief gory images and/or infrequent use of crude language.",
        "order": 3
      },
      {
        "certification": "U/A 13+",
        "meaning": "Viewable for 13 and above years old.",
        "order": 4
      },
      {
        "certification": "U/A 16+",
        "meaning": "Viewable for 16 and above years old.",
        "order": 5
      },
      {
        "certification": "A",
        "meaning": "Restricted to adult audiences (18 years or over). Nobody below the age of 18 may buy/rent an A-rated DVD, VHS, UMD or watch a film in the cinema with this rating. Films under this category may contain adult/disturbing themes, frequent crude language, brutal violence with blood and gore, strong sex scenes and/or scenes of drug abuse which is considered unsuitable for minors.",
        "order": 6
      },
      {
        "certification": "S",
        "meaning": "Restricted to any special class of persons.",
        "order": 7
      }
    ],
    "IT": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "T",
        "meaning": "All ages admitted.",
        "order": 1
      },
      {
        "certification": "6+",
        "meaning": "Not suitable for children under 6.",
        "order": 2
      },
      {
        "certification": "14+",
        "meaning": "Released to ages 14 and older; children who are at least 12 may be admitted with adult accompaniment.",
        "order": 3
      },
      {
        "certification": "18+",
        "meaning": "Released to ages 18 and older; children who are at least 16 may be admitted with adult accompaniment.",
        "order": 4
      }
    ],
    "LT": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "V",
        "meaning": "Movies for the audience of all ages.",
        "order": 1
      },
      {
        "certification": "N-7",
        "meaning": "Movies for viewers from 7 years old. Younger than 7 years of age, viewers of this index have been featured only together with accompanying adult persons.",
        "order": 2
      },
      {
        "certification": "N-13",
        "meaning": "Movies for viewers from 13 years of age. The viewers from 7 to 13 years of age are allowed to enter this index only together with accompanying adult persons.",
        "order": 3
      },
      {
        "certification": "N-16",
        "meaning": "Movies for viewers from 16 years of age.",
        "order": 4
      },
      {
        "certification": "N-18",
        "meaning": "Movies for viewers from 18 years of age.",
        "order": 5
      }
    ],
    "MY": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "U",
        "meaning": "(Umum: \"General Audiences\") - For general audiences. (Used by the majority of films screened in Malaysia until 2008 but it continues only for television, notably for RTM.)",
        "order": 1
      },
      {
        "certification": "P13",
        "meaning": "(Penjaga 13 : \"Parental Guidance 13\") - Children under 13 not admitted unless accompanied by an adult. (Introduced in 2006, this became the official Malaysian motion picture rating system in 2008. The \"PG-13\" rating was revised to \"P13\" from April 2012 onwards to emphasize the use of Malay language instead of English.) Passionate kissing scenes are not allowed under a P13 rating.",
        "order": 2
      },
      {
        "certification": "18SG",
        "meaning": "(Seram, Ganas: \"Graphic Violence and Horror/Terror\") - Film may contain strong violence, gore or horror/terror people may find objectionable.",
        "order": 3
      },
      {
        "certification": "18SX",
        "meaning": "(Seks: \"Sexual Content\") - Film may contain sex scenes, nudity or sexual dialogue/references people may find objectionable (despite scenes of sex and nudity being strictly censored off by the LPF.)",
        "order": 4
      },
      {
        "certification": "18PA",
        "meaning": "(Politik, Agama: \"Strong Religious or Political Elements\") - Film may contain elements which include religious, social or political aspects people may find objectionable. Rarely used.",
        "order": 5
      },
      {
        "certification": "18PL",
        "meaning": "(Pelbagai: \"Various\") - Film may contain strong violence, gore, horror/terror, sex scenes, nudity, sexual dialogues/references, religious, social or political aspects people may find objectionable. The majority of the 18+ movies use this rating. For example, a film with sex scenes and strong violence will be classified as 18PL, despite scenes of sex and nudity being strictly censored off by the LPF.",
        "order": 6
      }
    ],
    "NL": [
      {
        "certification": "AL",
        "meaning": "All ages.",
        "order": 1
      },
      {
        "certification": "6",
        "meaning": "Potentially harmful to children under 6 years.",
        "order": 2
      },
      {
        "certification": "9",
        "meaning": "Potentially harmful to children under 9 years.",
        "order": 3
      },
      {
        "certification": "12",
        "meaning": "Potentially harmful to children under 12 years; broadcasting is not allowed before 8:00 pm.",
        "order": 4
      },
      {
        "certification": "16",
        "meaning": "Potentially harmful to children under 16 years; broadcasting is not allowed before 10:00 pm.",
        "order": 6
      },
      {
        "certification": "14",
        "meaning": "Potentially harmful to children under 14 years; broadcasting is not allowed before 8:00 pm.",
        "order": 5
      },
      {
        "certification": "18",
        "meaning": "Potentially harmful to (and not allowed for) children under 18 years; broadcasting is not allowed before midnight.",
        "order": 7
      }
    ],
    "NO": [
      {
        "certification": "6",
        "meaning": "6 years (no restriction for children accompanied by an adult).",
        "order": 2
      },
      {
        "certification": "9",
        "meaning": "9 years (children down to 6 years accompanied by an adult).",
        "order": 3
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "18",
        "meaning": " 18 years (absolute lower limit).",
        "order": 6
      },
      {
        "certification": "15",
        "meaning": "15 years (young down to 12 years accompanied by an adult).",
        "order": 5
      },
      {
        "certification": "12",
        "meaning": "12 years (children down to 9 years accompanied by an adult).",
        "order": 4
      },
      {
        "certification": "A",
        "meaning": "Suitable for all.",
        "order": 1
      }
    ],
    "NZ": [
      {
        "certification": "G",
        "meaning": "Suitable for general audiences.",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "Parental guidance recommended for younger viewers.",
        "order": 2
      },
      {
        "certification": "M",
        "meaning": "Suitable for (but not restricted to) mature audiences 16 years and up.",
        "order": 3
      },
      {
        "certification": "R13",
        "meaning": "Restricted to persons 13 years of age and over.",
        "order": 4
      },
      {
        "certification": "R15",
        "meaning": "Restricted to persons 15 years of age and over.",
        "order": 6
      },
      {
        "certification": "R16",
        "meaning": "Restricted to persons 16 years of age and over.",
        "order": 7
      },
      {
        "certification": "R18",
        "meaning": "Restricted to persons 18 years of age and over.",
        "order": 9
      },
      {
        "certification": "R",
        "meaning": "Restricted to a particular class of persons, or for particular purposes, or both.",
        "order": 11
      },
      {
        "certification": "RP13",
        "meaning": "",
        "order": 5
      },
      {
        "certification": "RP16",
        "meaning": "",
        "order": 8
      },
      {
        "certification": "RP18",
        "meaning": "",
        "order": 10
      }
    ],
    "PH": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "PG",
        "meaning": "Viewers below 13 years old must be accompanied by a parent or supervising adult.",
        "order": 2
      },
      {
        "certification": "X",
        "meaning": "“X-rated” films are not suitable for public exhibition.",
        "order": 6
      },
      {
        "certification": "R-18",
        "meaning": "Only viewers who are 18 years old and above can be admitted.",
        "order": 5
      },
      {
        "certification": "R-16",
        "meaning": "Only viewers who are 16 years old and above can be admitted.",
        "order": 4
      },
      {
        "certification": "G",
        "meaning": "Viewers of all ages are admitted.",
        "order": 1
      },
      {
        "certification": "R-13",
        "meaning": "Only viewers who are 13 years old and above can be admitted.",
        "order": 3
      }
    ],
    "PT": [
      {
        "certification": "Públicos",
        "meaning": "For all the public (especially designed for children under 3 years of age).",
        "order": 1
      },
      {
        "certification": "M/3",
        "meaning": "Passed for viewers aged 3 and older.",
        "order": 2
      },
      {
        "certification": "M/6",
        "meaning": "Passed for viewers aged 6 and older.",
        "order": 3
      },
      {
        "certification": "M/12",
        "meaning": "Passed for viewers aged 12 and older.",
        "order": 4
      },
      {
        "certification": "M/14",
        "meaning": "Passed for viewers aged 14 and older.",
        "order": 5
      },
      {
        "certification": "M/16",
        "meaning": "Passed for viewers aged 16 and older.",
        "order": 6
      },
      {
        "certification": "M/18",
        "meaning": "Passed for viewers aged 18 and older.",
        "order": 7
      },
      {
        "certification": "P",
        "meaning": "Special rating supplementary to the M/18 age rating denoting pornography.",
        "order": 8
      }
    ],
    "RU": [
      {
        "certification": "6+",
        "meaning": "(For children above 6) – Unsuitable for children under 6.",
        "order": 2
      },
      {
        "certification": "0+",
        "meaning": "All ages are admitted.",
        "order": 1
      },
      {
        "certification": "16+",
        "meaning": "(For children above 16) – Unsuitable for children under 16.",
        "order": 4
      },
      {
        "certification": "18+",
        "meaning": "(Prohibited for children) – Prohibited for children under 18.",
        "order": 5
      },
      {
        "certification": "12+",
        "meaning": "(For children above 12) – Unsuitable for children under 12.",
        "order": 3
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      }
    ],
    "SE": [
      {
        "certification": "11",
        "meaning": "Children over the age of 7, who are accompanied by an adult, are admitted to films that have been passed for children from the age of 11.",
        "order": 3
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "15",
        "meaning": "Children over the age of 7, who are accompanied by an adult, are admitted to films that have been passed for children from the age of 11. Updated on March 1, 2017.",
        "order": 4
      },
      {
        "certification": "Btl",
        "meaning": "All ages.",
        "order": 1
      },
      {
        "certification": "7",
        "meaning": "Children under the age of 7, who are accompanied by an adult (a person aged 18 or over), are admitted to films that have been passed for children from the age of 7.",
        "order": 2
      }
    ],
    "US": [
      {
        "certification": "R",
        "meaning": "Under 17 requires accompanying parent or adult guardian 21 or older. The parent/guardian is required to stay with the child under 17 through the entire movie, even if the parent gives the child/teenager permission to see the film alone. These films may contain strong profanity, graphic sexuality, nudity, strong violence, horror, gore, and strong drug use. A movie rated R for profanity often has more severe or frequent language than the PG-13 rating would permit. An R-rated movie may have more blood, gore, drug use, nudity, or graphic sexuality than a PG-13 movie would admit.",
        "order": 4
      },
      {
        "certification": "PG",
        "meaning": "Some material may not be suitable for children under 10. These films may contain some mild language, crude/suggestive humor, scary moments and/or violence. No drug content is present. There are a few exceptions to this rule. A few racial insults may also be heard.",
        "order": 2
      },
      {
        "certification": "NC-17",
        "meaning": "These films contain excessive graphic violence, intense or explicit sex, depraved, abhorrent behavior, explicit drug abuse, strong language, explicit nudity, or any other elements which, at present, most parents would consider too strong and therefore off-limits for viewing by their children and teens. NC-17 does not necessarily mean obscene or pornographic in the oft-accepted or legal meaning of those words.",
        "order": 5
      },
      {
        "certification": "G",
        "meaning": "All ages admitted. There is no content that would be objectionable to most parents. This is one of only two ratings dating back to 1968 that still exists today.",
        "order": 1
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "PG-13",
        "meaning": "Some material may be inappropriate for children under 13. Films given this rating may contain sexual content, brief or partial nudity, some strong language and innuendo, humor, mature themes, political themes, terror and/or intense action violence. However, bloodshed is rarely present. This is the minimum rating at which drug content is present.",
        "order": 3
      }
    ],
    "KR": [
      {
        "certification": "All",
        "meaning": "Film suitable for all ages.",
        "order": 0
      },
      {
        "certification": "12",
        "meaning": "Film intended for audiences 12 and over. Underage audiences accompanied by a parent or guardian are allowed.",
        "order": 1
      },
      {
        "certification": "15",
        "meaning": "Film intended for audiences 15 and over. Underage audiences accompanied by a parent or guardian are allowed.",
        "order": 2
      },
      {
        "certification": "18",
        "meaning": "No one under 18 is allowed to watch this film.",
        "order": 3
      },
      {
        "certification": "Restricted Screening",
        "meaning": "Film needs a certain restriction in screening or advertisement as it is considered a highly bad influence to universal human dignity, social value, good customs or national emotion due to excessive expression of nudity, violence, social behavior, etc. (technically not an age restriction but films with this rating may only be screened at \"adults only\" theatres, with the age of majority set at 19).",
        "order": 4
      }
    ],
    "SK": [
      {
        "certification": "U",
        "meaning": "General audience.",
        "order": 1
      },
      {
        "certification": "7",
        "meaning": "Not recommended for children younger than 7 years.",
        "order": 2
      },
      {
        "certification": "12",
        "meaning": "Not recommended for people younger than 12 years.",
        "order": 3
      },
      {
        "certification": "15",
        "meaning": "Not recommended for people younger than 15 years.",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "Prohibited for minors under 18 years of age.",
        "order": 5
      }
    ],
    "TH": [
      {
        "certification": "P",
        "meaning": "Educational.",
        "order": 1
      },
      {
        "certification": "G",
        "meaning": "General audience",
        "order": 2
      },
      {
        "certification": "13",
        "meaning": "Suitable for viewers aged 13 years and over.",
        "order": 3
      },
      {
        "certification": "15",
        "meaning": "Suitable for viewers aged 15 years and over",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "Suitable for viewers aged 18 years and over.",
        "order": 5
      },
      {
        "certification": "20",
        "meaning": "Content is unsuitable for viewers aged under 20",
        "order": 6
      },
      {
        "certification": "Banned",
        "meaning": "Films that are not allowed to screen publicly in Thailand",
        "order": 7
      }
    ],
    "MX": [
      {
        "certification": "AA",
        "meaning": "Informative-only rating: Understandable for children under 7 years.",
        "order": 1
      },
      {
        "certification": "A",
        "meaning": "Information-only rating: For all age groups.",
        "order": 2
      },
      {
        "certification": "B",
        "meaning": "Information-only rating: For adolescents 12 years and older.",
        "order": 3
      },
      {
        "certification": "B-15",
        "meaning": "Information-only rating: Not recommended for children under 15.",
        "order": 4
      },
      {
        "certification": "C",
        "meaning": "Restrictive rating: For adults 18 and older.",
        "order": 5
      },
      {
        "certification": "D",
        "meaning": "Restrictive rating: Adult movies (legally prohibited to those under 18 years of age).",
        "order": 6
      }
    ],
    "ID": [
      {
        "certification": "SU",
        "meaning": "All ages.",
        "order": 1
      },
      {
        "certification": "13+",
        "meaning": "Suitable for ages 13 and above.",
        "order": 2
      },
      {
        "certification": "17+",
        "meaning": "Suitable for ages 17 and above.",
        "order": 3
      },
      {
        "certification": "21+",
        "meaning": "Suitable for ages 21 and above.",
        "order": 4
      }
    ],
    "TR": [
      {
        "certification": "Genel İzleyici Kitlesi",
        "meaning": "General audience.",
        "order": 1
      },
      {
        "certification": "6A",
        "meaning": "Viewers under the age of 6 may watch with accompanying family members.",
        "order": 2
      },
      {
        "certification": "6+",
        "meaning": "Suitable for viewers aged 6 and over.",
        "order": 3
      },
      {
        "certification": "10A",
        "meaning": "Viewers under the age of 10 may watch with accompanying family members.",
        "order": 4
      },
      {
        "certification": "10+",
        "meaning": "Suitable for viewers aged 10 and over.",
        "order": 5
      },
      {
        "certification": "13A",
        "meaning": "Viewers under the age of 13 may watch with accompanying family members.",
        "order": 6
      },
      {
        "certification": "13+",
        "meaning": "Suitable for viewers aged 13 and over.",
        "order": 7
      },
      {
        "certification": "16+",
        "meaning": "Suitable for viewers aged 16 and over.",
        "order": 8
      },
      {
        "certification": "18+",
        "meaning": "Suitable for viewers aged 18 and over.",
        "order": 9
      }
    ],
    "AR": [
      {
        "certification": "ATP",
        "meaning": "For all public.",
        "order": 1
      },
      {
        "certification": "+13",
        "meaning": "Suitable for 13-year-olds and over. Children under the age of 13 are admitted if accompanied by an adult.",
        "order": 2
      },
      {
        "certification": "+16",
        "meaning": "Suitable for 16-year-olds and over.",
        "order": 3
      },
      {
        "certification": "+18",
        "meaning": "Suitable for 18-year-olds and over.",
        "order": 4
      },
      {
        "certification": "C",
        "meaning": "Suitable for 18-year-olds and over. Restricted to specially licensed venues.",
        "order": 5
      }
    ],
    "GR": [
      {
        "certification": "K",
        "meaning": "No restrictions.",
        "order": 1
      },
      {
        "certification": "K12",
        "meaning": "The film may contain mild violence and adult themes. Suitable for people aged 13 and above.",
        "order": 2
      },
      {
        "certification": "K15",
        "meaning": "The film may contain violence, drug abuse, and softcore pornographic scenes. An ID card certifying the age is required in all Greek cinemas and video rental shops in order to get a cinema ticket or rent a video of a ",
        "order": 3
      },
      {
        "certification": "K18",
        "meaning": "Not permitted to people under the age of 18.",
        "order": 4
      }
    ],
    "TW": [
      {
        "certification": "0+",
        "meaning": "Viewing is permitted for audiences of all ages.",
        "order": 1
      },
      {
        "certification": "6+",
        "meaning": "Viewing is not permitted for children under 6; children between 6 and 11 shall be accompanied and given guidance by parents, teachers, seniors, or adult relatives or friends.",
        "order": 2
      },
      {
        "certification": "12+",
        "meaning": "Viewing is not permitted for children under 12.",
        "order": 3
      },
      {
        "certification": "15+",
        "meaning": "Viewing is not permitted for those under 15.",
        "order": 4
      },
      {
        "certification": "18+",
        "meaning": "Viewing is not permitted for those under 18.",
        "order": 5
      }
    ],
    "ZA": [
      {
        "certification": "A",
        "meaning": "Suitable for all.",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "Parental Guidance.",
        "order": 2
      },
      {
        "certification": "7-9PG",
        "meaning": "Not suitable for children under the age of 7. Children aged 7–9 years old may not be admitted unless accompanied by an adult.",
        "order": 3
      },
      {
        "certification": "10-12PG",
        "meaning": "Not suitable for children under the age of 10. Children aged 10–12 years old may not be admitted unless accompanied by an adult.",
        "order": 4
      },
      {
        "certification": "13",
        "meaning": "Not suitable for children under the age of 13.",
        "order": 5
      },
      {
        "certification": "16",
        "meaning": "Not suitable for persons under the age of 16.",
        "order": 6
      },
      {
        "certification": "18",
        "meaning": "Not suitable for persons under the age of 18.",
        "order": 7
      },
      {
        "certification": "X18",
        "meaning": "No one under 18 admitted; restricted to licensed adult premises.",
        "order": 8
      },
      {
        "certification": "XX",
        "meaning": "Must not be distributed or exhibited in public.",
        "order": 9
      }
    ],
    "SG": [
      {
        "certification": "G",
        "meaning": "Suitable for all ages.",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "Suitable for all but parents should guide their young.",
        "order": 2
      },
      {
        "certification": "PG13",
        "meaning": "Suitable for persons aged 13 and above but parental guidance is advised for children below 13.",
        "order": 3
      },
      {
        "certification": "NC16",
        "meaning": "Suitable for persons aged 16 and above.",
        "order": 4
      },
      {
        "certification": "M18",
        "meaning": "Suitable for persons aged 18 and above.",
        "order": 5
      },
      {
        "certification": "R21",
        "meaning": "Suitable for adults aged 21 and above (restricted to licensed cinemas).",
        "order": 6
      }
    ],
    "IE": [
      {
        "certification": "G",
        "meaning": "Suitable for children of school going age (note: children can be enrolled in school from the age of 4).",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "Suitable for children over the age of 8. Parental guidance is recommended for children under the age of 12.",
        "order": 2
      },
      {
        "certification": "12A",
        "meaning": "Suitable for viewers of 12 and over. Younger children may be admitted to the film at cinemas if accompanied by an adult; on home video younger viewers are not permitted to purchase/rent the video.",
        "order": 3
      },
      {
        "certification": "15A",
        "meaning": "Suitable for viewers of 15 and over. Younger viewers may be admitted to the film at cinemas if accompanied by an adult; on home video younger viewers are not permitted to purchase/rent the video.",
        "order": 4
      },
      {
        "certification": "16",
        "meaning": "Suitable for viewers of 16 and over. Younger viewers are not admitted.",
        "order": 5
      },
      {
        "certification": "18",
        "meaning": "Suitable only for adults. Viewers under 18 are not admitted at cinemas or permitted to purchase/rent the video.",
        "order": 6
      },
      {
        "certification": "12",
        "meaning": "Suitable for viewers of 12 and over. Younger children may be admitted to the film at cinemas if accompanied by an adult; on home video younger viewers are not permitted to purchase/rent the video.",
        "order": 3
      },
      {
        "certification": "15",
        "meaning": "Suitable for viewers of 15 and over. Younger viewers may be admitted to the film at cinemas if accompanied by an adult; on home video younger viewers are not permitted to purchase/rent the video.",
        "order": 4
      }
    ],
    "PR": [
      {
        "certification": "G",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "PG-13",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "R",
        "meaning": "",
        "order": 4
      },
      {
        "certification": "NC-17",
        "meaning": "",
        "order": 5
      },
      {
        "certification": "NR",
        "meaning": "",
        "order": 0
      }
    ],
    "JP": [
      {
        "certification": "G",
        "meaning": "General, suitable for all ages.",
        "order": 1
      },
      {
        "certification": "PG12",
        "meaning": "Parental guidance requested for young people under 12 years.",
        "order": 2
      },
      {
        "certification": "R15+",
        "meaning": "No one under 15 admitted.",
        "order": 3
      },
      {
        "certification": "R18+",
        "meaning": "No one under 18 admitted.",
        "order": 4
      }
    ],
    "VI": [
      {
        "certification": "G",
        "meaning": "All ages admitted.",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "Some material may not be suitable for children.",
        "order": 2
      },
      {
        "certification": "PG-13",
        "meaning": "Some material may be inappropriate for children under 13.",
        "order": 3
      },
      {
        "certification": "R",
        "meaning": "Under 17 requires accompanying parent or adult guardian.",
        "order": 4
      },
      {
        "certification": "NC-17",
        "meaning": "No one 17 and under admitted.",
        "order": 5
      },
      {
        "certification": "NR",
        "meaning": "",
        "order": 0
      }
    ],
    "CH": [
      {
        "certification": "0",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "6",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "8",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "10",
        "meaning": "",
        "order": 4
      },
      {
        "certification": "12",
        "meaning": "",
        "order": 5
      },
      {
        "certification": "14",
        "meaning": "",
        "order": 6
      },
      {
        "certification": "16",
        "meaning": "",
        "order": 7
      },
      {
        "certification": "18",
        "meaning": "",
        "order": 8
      }
    ],
    "IL": [
      {
        "certification": "All",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "12",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "14",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "16",
        "meaning": "",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "",
        "order": 5
      }
    ],
    "HK": [
      {
        "certification": "I",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "IIA",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "IIB",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "III",
        "meaning": "",
        "order": 4
      }
    ],
    "MO": [
      {
        "certification": "A",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "B",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "C",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "D",
        "meaning": "",
        "order": 4
      }
    ],
    "LV": [
      {
        "certification": "U",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "7+",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "12+",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "16+",
        "meaning": "",
        "order": 4
      },
      {
        "certification": "18+",
        "meaning": "",
        "order": 5
      }
    ],
    "LU": [
      {
        "certification": "EA",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "6",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "12",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "16",
        "meaning": "",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "",
        "order": 5
      }
    ],
    "CZ": [
      {
        "certification": "UR",
        "meaning": "Not rated.",
        "order": 0
      },
      {
        "certification": "U",
        "meaning": "No age limit.",
        "order": 1
      },
      {
        "certification": "12+",
        "meaning": "Unsuitable for persons under the age of 12.",
        "order": 2
      },
      {
        "certification": "15+",
        "meaning": "Unsuitable for persons under the age of 15.",
        "order": 3
      },
      {
        "certification": "18+",
        "meaning": "Unsuitable for persons under the age of 18.",
        "order": 4
      }
    ]
  };

  let tvCertData = {
    "AU": [
      {
        "certification": "P",
        "meaning": "Programming is intended for younger children 2–11; commercial stations must show at least 30 minutes of P-rated content each weekday and weekends at all times. No advertisements may be shown during P-rated programs.",
        "order": 1
      },
      {
        "certification": "C",
        "meaning": "Programming intended for older children 5–14; commercial stations must show at least 30 minutes of C-rated content each weekday between 7 a.m. and 8 a.m. or between 4 p.m. and 8:30 p.m. A further 2 and a half ours a week must also be shown either within these time bands or between 7 a.m. and 8:30 p.m. on weekends and school holidays, for a total of five hours a week (averaged as 260 hours over the course of a year). C-rated content is subject to certain restrictions and limitations on advertising (typically five minutes maximum per 30-minute period or seven minutes including promotions and community announcements).",
        "order": 2
      },
      {
        "certification": "G",
        "meaning": "For general exhibition; all ages are permitted to watch programming with this rating.",
        "order": 3
      },
      {
        "certification": "PG",
        "meaning": "Parental guidance is recommended for young viewers; PG-rated content may air at any time on digital-only channels, otherwise, it should only be broadcast between 8:30 a.m. and 4:00 p.m. and between 7:00 p.m. and 6:00 a.m. on weekdays, and between 10:00 a.m. and 6:00 a.m. on weekends.",
        "order": 4
      },
      {
        "certification": "M",
        "meaning": "Recommended for mature audiences; M-rated content may only be broadcast between 8:30 p.m. and 5:00 a.m. on any day, and additionally between 12:00 p.m. and 3:00 p.m. on schooldays.",
        "order": 5
      },
      {
        "certification": "MA 15+",
        "meaning": "Not suitable for children and teens under 15; MA15+-rated programming may only be broadcast between 9:00 p.m. and 5:00 a.m. on any given day. Consumer advice is mandatory. Some R18+ rated movies on DVD/Blu-ray are often re-edited on free TV/cable channels to secure a more ",
        "order": 6
      },
      {
        "certification": "AV 15+",
        "meaning": "Not suitable for children and teens under 15; this is the same as the MA15+ rating, except the ",
        "order": 7
      },
      {
        "certification": "R 18+",
        "meaning": "Not for children under 18; this is limited to Adult ",
        "order": 8
      }
    ],
    "BR": [
      {
        "certification": "14",
        "meaning": "Content suitable for viewers over the age of 14.",
        "order": 3
      },
      {
        "certification": "16",
        "meaning": "Content suitable for viewers over the age of 16.",
        "order": 4
      },
      {
        "certification": "L",
        "meaning": "Content is suitable for all audiences.",
        "order": 0
      },
      {
        "certification": "10",
        "meaning": "Content suitable for viewers over the age of 10.",
        "order": 1
      },
      {
        "certification": "12",
        "meaning": "Content suitable for viewers over the age of 12.",
        "order": 2
      },
      {
        "certification": "18",
        "meaning": "Content suitable for viewers over the age of 18.",
        "order": 5
      }
    ],
    "CA": [
      {
        "certification": "Exempt",
        "meaning": "Shows which are exempt from ratings (such as news and sports programming) will not display an on-screen rating at all.",
        "order": 1
      },
      {
        "certification": "C",
        "meaning": "Programming suitable for children ages of 2–7 years. No profanity or sexual content of any level allowed. Contains little violence.",
        "order": 2
      },
      {
        "certification": "C8",
        "meaning": "Suitable for children ages 8+. Low level violence and fantasy horror is allowed. No foul language is allowed, but occasional ",
        "order": 3
      },
      {
        "certification": "G",
        "meaning": "Suitable for general audiences. Programming suitable for the entire family with mild violence, and mild profanity and/or censored language.",
        "order": 4
      },
      {
        "certification": "PG",
        "meaning": "Parental guidance. Moderate violence and moderate profanity is allowed, as is brief nudity and sexual references if important to the context of the story.",
        "order": 5
      },
      {
        "certification": "14+",
        "meaning": "Programming intended for viewers ages 14 and older. May contain strong violence and strong profanity, and depictions of sexual activity as long as they are within the context of a story.",
        "order": 6
      },
      {
        "certification": "18+",
        "meaning": "Programming intended for viewers ages 18 and older. May contain explicit violence and sexual activity. Programming with this rating cannot air before the watershed (9:00 p.m. to 6:00 a.m.).",
        "order": 7
      }
    ],
    "CA-QC": [
      {
        "certification": "18+",
        "meaning": "Only to be viewed by adults and may contain extreme violence and graphic sexual content. It is mostly used for 18+ movies and pornography.",
        "order": 5
      },
      {
        "certification": "13+",
        "meaning": "Appropriate – suitable for children 13 and up and may contain with moderate violence, language, and some sexual situations.",
        "order": 3
      },
      {
        "certification": "8+",
        "meaning": "Appropriate for children 8 and up may contain with little violence, language, and little to no sexual situations.",
        "order": 2
      },
      {
        "certification": "16+",
        "meaning": "Recommended for children over the age of 16 and may contain with strong violence, strong language, and strong sexual content.",
        "order": 4
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "G",
        "meaning": "Appropriate for all ages and must contain little or no violence and little to no sexual content.",
        "order": 1
      }
    ],
    "DE": [
      {
        "certification": "0",
        "meaning": "Can be aired at any time.",
        "order": 1
      },
      {
        "certification": "6",
        "meaning": "Can be aired at any time.",
        "order": 2
      },
      {
        "certification": "12",
        "meaning": "The broadcaster must take the decision about the air time by taking in consideration the impact on young children in the timeframe from 6:00am to 8:00pm.",
        "order": 3
      },
      {
        "certification": "16",
        "meaning": "Can be aired only from 10:00pm Uhr to 6:00am.",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "Can be aired only from 11:00pm Uhr to 6:00am.",
        "order": 5
      }
    ],
    "ES": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "ERI",
        "meaning": "Specially recommended for younger children.",
        "order": 1
      },
      {
        "certification": "TP",
        "meaning": "For general viewing.",
        "order": 2
      },
      {
        "certification": "7",
        "meaning": "Not recommended for viewers under the age of 7.",
        "order": 3
      },
      {
        "certification": "10",
        "meaning": "Not recommended for viewers under the age of 10.",
        "order": 4
      },
      {
        "certification": "12",
        "meaning": "Not recommended for viewers under the age of 12.",
        "order": 5
      },
      {
        "certification": "13",
        "meaning": "Not recommended for viewers under the age of 13.",
        "order": 6
      },
      {
        "certification": "16",
        "meaning": "Not recommended for viewers under the age of 16.",
        "order": 7
      },
      {
        "certification": "18",
        "meaning": "Not recommended for viewers under the age of 18.",
        "order": 8
      }
    ],
    "FR": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "10",
        "meaning": "Not recommended for children under 10. Not allowed in children's television series.",
        "order": 1
      },
      {
        "certification": "12",
        "meaning": "Not recommended for children under 12. Not allowed air before 10:00 p.m. Some channels and programs are subject to exception.",
        "order": 2
      },
      {
        "certification": "16",
        "meaning": "Not recommended for children under 16. Not allowed air before 10:30 p.m. Some channels and programs are subject to exception.",
        "order": 3
      },
      {
        "certification": "18",
        "meaning": "Not recommended for persons under 18. Allowed between midnight and 5 a.m. and only in some channels, access to these programs is locked by a personal password.",
        "order": 4
      }
    ],
    "GB": [
      {
        "certification": "U",
        "meaning": "The U symbol stands for Universal. A U film should be suitable for audiences aged four years and over.",
        "order": 0
      },
      {
        "certification": "PG",
        "meaning": "PG stands for Parental Guidance. This means a film is suitable for general viewing, but some scenes may be unsuitable for young children. A PG film should not unsettle a child aged around eight or older.",
        "order": 1
      },
      {
        "certification": "12A",
        "meaning": "Films classified 12A and video works classified 12 contain material that is not generally suitable for children aged under 12. 12A requires an adult to accompany any child under 12 seeing a 12A film at the cinema.",
        "order": 2
      },
      {
        "certification": "12",
        "meaning": "Films classified 12A and video works classified 12 contain material that is not generally suitable for children aged under 12.",
        "order": 3
      },
      {
        "certification": "15",
        "meaning": "No-one under 15 is allowed to see a 15 film at the cinema or buy/rent a 15 rated video. 15 rated works are not suitable for children under 15 years of age.",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "Films rated 18 are for adults. No-one under 18 is allowed to see an 18 film at the cinema or buy / rent an 18 rated video. No 18 rated works are suitable for children.",
        "order": 5
      },
      {
        "certification": "R18",
        "meaning": "The R18 category is a special and legally-restricted classification primarily for explicit works of consenting sex or strong fetish material involving adults.",
        "order": 6
      }
    ],
    "HU": [
      {
        "certification": "Unrated",
        "meaning": "Without age restriction.",
        "order": 1
      },
      {
        "certification": "Children",
        "meaning": "Programs recommended for children. It is an optional rating, there is no obligation for broadcasters to indicate it.",
        "order": 2
      },
      {
        "certification": "16",
        "meaning": "Programs not recommended for teens and children below the age of 16, may contain more intensive violence and sexual content. A yellow circle with the number 16 written inside is used for this rating.",
        "order": 5
      },
      {
        "certification": "18",
        "meaning": "The program is recommended only for adult viewers (for ages 18 and up), may contain explicit violence and explicit sexual content. A red circle with the number 18 written inside is used for this rating (the red circle was also used until 2002, but it did not contain any number in it).",
        "order": 6
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "6",
        "meaning": "Programs not recommended for children below the age of 6, may not contain any violence or sexual content. A yellow circle with the number 6 written inside is used for this rating.",
        "order": 3
      },
      {
        "certification": "12",
        "meaning": "Programs not recommended for children below the age of 12, may contain light sexual content or explicit language. Most films without serious violence or sexual content fit into this category as well. A yellow circle with the number 12 written inside is used for this rating.",
        "order": 4
      }
    ],
    "KR": [
      {
        "certification": "Exempt",
        "meaning": "This rating is only for knowledge based game shows; lifestyle shows; documentary shows; news; current topic discussion shows; education/culture shows; sports that excludes MMA or other violent sports; and other programs that Korea Communications Standards Commission recognizes.",
        "order": 1
      },
      {
        "certification": "ALL",
        "meaning": "This rating is for programming that is appropriate for all ages. This program usually involves programs designed for children or families.",
        "order": 2
      },
      {
        "certification": "7",
        "meaning": "This rating is for programming that may contain material inappropriate for children younger than 7, and parental discretion should be used. Some cartoon programming not deemed strictly as ",
        "order": 3
      },
      {
        "certification": "12",
        "meaning": "This rating is for programs that may deemed inappropriate for those younger than 12, and parental discretion should be used. Usually used for animations that have stronger themes or violence then those designed for children, or for reality shows that have mild violence, themes, or language.",
        "order": 4
      },
      {
        "certification": "15",
        "meaning": "This rating is for programs that contain material that may be inappropriate for children under 15, and that parental discretion should be used. Examples include most dramas, and talk shows on OTA (over-the-air) TV (KBS, MBC, SBS), and many American TV shows/dramas on Cable TV channels like OCN and OnStyle. The programs that have this rating may include moderate or strong adult themes, language, sexual inference, and violence. As with the TV-MA rating in North America, this rating is commonly applied to live events where the occurrence of inappropriate dialogue is unpredictable. Since 2007, this rating is the most used rating for TV.",
        "order": 5
      },
      {
        "certification": "19",
        "meaning": "This rating is for programs that are intended for adults only. 19-rated programming cannot air during the hours of 7:00AM to 9:00AM, and 1:00PM to 10:00PM. Programmes that receive this rating will almost certainly have adult themes, sexual situations, frequent use of strong language and disturbing scenes of violence.",
        "order": 6
      }
    ],
    "LT": [
      {
        "certification": "S",
        "meaning": "Intended for adult viewers from the age of 18 (corresponding to the age-appropriate index N-18) and broadcast between 23 (11pm) and 6 (6am) hours; Limited to minors and intended for adult audiences.",
        "order": 3
      },
      {
        "certification": "N-14",
        "meaning": "Intended for viewers from 14 years of age and broadcast from 21 (9pm) to 6 (6am) hours.",
        "order": 2
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "N-7",
        "meaning": "Intended for viewers from 7 years old.",
        "order": 1
      }
    ],
    "NL": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "AL",
        "meaning": "Not harmful / All Ages.",
        "order": 1
      },
      {
        "certification": "6",
        "meaning": "Take care with children under 6.",
        "order": 2
      },
      {
        "certification": "9",
        "meaning": "Take care with children under 9.",
        "order": 3
      },
      {
        "certification": "12",
        "meaning": "Take care with children under 12.",
        "order": 4
      },
      {
        "certification": "16",
        "meaning": "Take care with children under 16.",
        "order": 6
      },
      {
        "certification": "14",
        "meaning": "Take care with children under 14.",
        "order": 5
      },
      {
        "certification": "18",
        "meaning": "Take care with children under 18.",
        "order": 7
      }
    ],
    "PH": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "G",
        "meaning": "Suitable for all ages. Material for television, which in the judgment of the Board does not contain anything unsuitable for children.",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "Parental guidance suggested. Material for television, which, in the judgment of the Board, may contain some adult material that may be permissible for children to watch but only under the guidance and supervision of a parent or adult.",
        "order": 2
      },
      {
        "certification": "SPG",
        "meaning": "Stronger and more vigilant parental guidance is suggested. Programs classified as “SPG” may contain more serious topic and theme, which may not be advisable for children to watch except under the very vigilant guidance and presence of a parent or an adult.",
        "order": 3
      },
      {
        "certification": "X",
        "meaning": "Any television program that does not conform to the “G”, “PG”, and “SPG” classification shall be disapproved for television broadcast.",
        "order": 4
      }
    ],
    "PT": [
      {
        "certification": "12AP",
        "meaning": "Acompanhamento Parental (may not be suitable for children under 12, parental guidance advised).",
        "order": 3
      },
      {
        "certification": "18",
        "meaning": "Not suitable for children under 18.",
        "order": 5
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "16",
        "meaning": "Not suitable for children under 16, access to these programs is locked by a personal password.",
        "order": 4
      },
      {
        "certification": "T",
        "meaning": "Todos (suitable for all).",
        "order": 1
      },
      {
        "certification": "10AP",
        "meaning": "Acompanhamento Parental (may not be suitable for children under 10, parental guidance advised).",
        "order": 2
      }
    ],
    "RU": [
      {
        "certification": "16+",
        "meaning": "Only teens the age of 16 or older can watch.",
        "order": 4
      },
      {
        "certification": "18+",
        "meaning": "Restricted to People 18 or Older.",
        "order": 5
      },
      {
        "certification": "6+",
        "meaning": "Only kids the age of 6 or older can watch.",
        "order": 2
      },
      {
        "certification": "12+",
        "meaning": "Only kids the age of 12 or older can watch.",
        "order": 3
      },
      {
        "certification": "0+",
        "meaning": "Can be watched by Any Age.",
        "order": 1
      }
    ],
    "SK": [
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "7",
        "meaning": "Content suitable for children over 6 years.",
        "order": 2
      },
      {
        "certification": "U",
        "meaning": "Content suitable for all children.",
        "order": 1
      },
      {
        "certification": "12",
        "meaning": "Content suitable for children over 12 years.",
        "order": 3
      },
      {
        "certification": "15",
        "meaning": "Content suitable for teens over 15 years.",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "Content exclusively for adults.",
        "order": 5
      }
    ],
    "TH": [
      {
        "certification": "ส",
        "meaning": "Sor - Educational movies which the public should be encouraged to see.",
        "order": 1
      },
      {
        "certification": "ท",
        "meaning": "Tor - G Movies appropriate for the general public. No sex, abusive language or violence.",
        "order": 2
      },
      {
        "certification": "น 13+",
        "meaning": "Nor 13+ Movies appropriate for audiences aged 13 and older.",
        "order": 3
      },
      {
        "certification": "น 15+",
        "meaning": "Nor 15+ Movies appropriate for audiences aged 15 and older. Some violence, brutality, inhumanity, bad language or indecent gestures allowed.",
        "order": 4
      },
      {
        "certification": "น 18+",
        "meaning": "Nor 18+ Movies appropriate for audiences aged 18 and older.",
        "order": 5
      },
      {
        "certification": "ฉ 20-",
        "meaning": "Chor 20 - Movies prohibited for audiences aged below 20.",
        "order": 6
      },
      {
        "certification": "-",
        "meaning": "Banned.",
        "order": 7
      }
    ],
    "US": [
      {
        "certification": "TV-MA",
        "meaning": "This program is specifically designed to be viewed by adults and therefore may be unsuitable for children under 17.",
        "order": 6
      },
      {
        "certification": "TV-Y",
        "meaning": "This program is designed to be appropriate for all children.",
        "order": 1
      },
      {
        "certification": "TV-14",
        "meaning": "This program contains some material that many parents would find unsuitable for children under 14 years of age.",
        "order": 5
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "TV-PG",
        "meaning": "This program contains material that parents may find unsuitable for younger children.",
        "order": 4
      },
      {
        "certification": "TV-Y7",
        "meaning": "This program is designed for children age 7 and above.",
        "order": 2
      },
      {
        "certification": "TV-G",
        "meaning": "Most parents would find this program suitable for all ages.",
        "order": 3
      }
    ],
    "IT": [
      {
        "certification": "T",
        "meaning": "All ages admitted.",
        "order": 1
      },
      {
        "certification": "BA",
        "meaning": "Parental guidance suggested.",
        "order": 2
      },
      {
        "certification": "VM12",
        "meaning": "Not recommended for children under 12.",
        "order": 3
      },
      {
        "certification": "VM14",
        "meaning": "Not recommended for children under 14.",
        "order": 4
      },
      {
        "certification": "VM18",
        "meaning": "Not recommended for children under 18.",
        "order": 5
      }
    ],
    "FI": [
      {
        "certification": "S",
        "meaning": "Allowed at all times.",
        "order": 0
      },
      {
        "certification": "K7",
        "meaning": "Not allowed air before 7:00 a.m., not recommended for children under 7.",
        "order": 1
      },
      {
        "certification": "K12",
        "meaning": "Not allowed air before 5:00 p.m., not recommended for children under 12.",
        "order": 2
      },
      {
        "certification": "K16",
        "meaning": "Not allowed air before 9:00 p.m., not recommended for children under 16.",
        "order": 3
      },
      {
        "certification": "K18",
        "meaning": "Not allowed air before 11:00 p.m., not recommended for children under 18.",
        "order": 4
      }
    ],
    "MY": [
      {
        "certification": "U",
        "meaning": "No age limit. Can be broadcast anytime.",
        "order": 1
      },
      {
        "certification": "P13",
        "meaning": "Viewers under 13 years of age need parental/guardian supervision while viewing. Can be broadcast anytime, but some elements may only be broadcast at night.",
        "order": 2
      },
      {
        "certification": "18",
        "meaning": "For viewers 18 and above. Cannot be broadcast before 10:00 PM.",
        "order": 3
      }
    ],
    "NZ": [
      {
        "certification": "G",
        "meaning": "Approved for general viewing.",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "Parental Guidance recommended for younger viewers.",
        "order": 2
      },
      {
        "certification": "M",
        "meaning": "Suitable for mature audiences 16 years and over.",
        "order": 3
      },
      {
        "certification": "16",
        "meaning": "People under 16 years should not view.",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "People under 18 years should not view.",
        "order": 5
      }
    ],
    "NO": [
      {
        "certification": "A",
        "meaning": "Allowed at all times.",
        "order": 1
      },
      {
        "certification": "6",
        "meaning": "Allowed at all times.",
        "order": 2
      },
      {
        "certification": "9",
        "meaning": "Allowed at all times.",
        "order": 3
      },
      {
        "certification": "12",
        "meaning": "Only allowed during the period 19.00 – 05.30.",
        "order": 4
      },
      {
        "certification": "15",
        "meaning": "Only allowed during the period 21.00 – 05.30.",
        "order": 5
      },
      {
        "certification": "18",
        "meaning": "Only allowed during the period 21.00 – 05.30.",
        "order": 6
      }
    ],
    "BG": [
      {
        "certification": "Unrated",
        "meaning": "Can be viewed for each age.",
        "order": 1
      },
      {
        "certification": "12",
        "meaning": "Content suitable for viewers over the age of 12.",
        "order": 2
      },
      {
        "certification": "14",
        "meaning": "Content suitable for viewers over the age of 14.",
        "order": 3
      },
      {
        "certification": "16",
        "meaning": "Content suitable for viewers over the age of 16.",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "Content suitable for viewers over the age of 18. Not allowed before 23:00.",
        "order": 5
      }
    ],
    "MX": [
      {
        "certification": "AA",
        "meaning": "Aimed at children (can be broadcast anytime).",
        "order": 1
      },
      {
        "certification": "A",
        "meaning": "Appropriate for all ages.",
        "order": 2
      },
      {
        "certification": "B",
        "meaning": "Designed for ages 12 and older (allowed only between 16:00 and 05:59).",
        "order": 3
      },
      {
        "certification": "B-15",
        "meaning": "Designed for ages 15 and up (allowed only between 19:00 and 05:59).",
        "order": 4
      },
      {
        "certification": "C",
        "meaning": "Designed to be viewed by adults aged 18 or older (allowed only between 21:00 and 05:59).",
        "order": 5
      },
      {
        "certification": "D",
        "meaning": "Exclusively for adults aged 18 or older (allowed only between midnight and 05:00).",
        "order": 6
      }
    ],
    "IN": [
      {
        "certification": "U",
        "meaning": "Viewable for all ages.",
        "order": 1
      },
      {
        "certification": "U/A 7+",
        "meaning": "Viewable for 7 and above years old.",
        "order": 2
      },
      {
        "certification": "U/A 13+",
        "meaning": "Viewable for 13 and above years old.",
        "order": 3
      },
      {
        "certification": "U/A 16+",
        "meaning": "Viewable for 16 and above years old.",
        "order": 4
      },
      {
        "certification": "A",
        "meaning": "Viewable only for adults.",
        "order": 5
      }
    ],
    "DK": [
      {
        "certification": "A",
        "meaning": "Suitable for a general audience.",
        "order": 1
      },
      {
        "certification": "7",
        "meaning": "Not recommended for children under 7.",
        "order": 2
      },
      {
        "certification": "11",
        "meaning": "For ages 11 and up.",
        "order": 3
      },
      {
        "certification": "15",
        "meaning": "For ages 15 and up.",
        "order": 4
      }
    ],
    "SE": [
      {
        "certification": "Btl",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "Från 7 år",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "Från 11 år",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "Från 15 år",
        "meaning": "",
        "order": 4
      }
    ],
    "ID": [
      {
        "certification": "SU",
        "meaning": "Suitable for general audiences over the age of 2 years.",
        "order": 1
      },
      {
        "certification": "P",
        "meaning": "Suitable for pre-school children from ages 2 through 6.",
        "order": 2
      },
      {
        "certification": "A",
        "meaning": "Suitable for children from ages 7 through 12.",
        "order": 3
      },
      {
        "certification": "R",
        "meaning": "Suitable for teens from ages 13 through 17.",
        "order": 4
      },
      {
        "certification": "D",
        "meaning": "Suitable for viewers over 18 and older. Programmes with this rating are aired from 10.00 PM to 03.00 AM.",
        "order": 5
      }
    ],
    "TR": [
      {
        "certification": "Genel İzleyici",
        "meaning": "General audience. Suitable for all ages.",
        "order": 1
      },
      {
        "certification": "7+",
        "meaning": "Suitable for ages 7 and over.",
        "order": 2
      },
      {
        "certification": "13+",
        "meaning": "Suitable for ages 13 and over.",
        "order": 3
      },
      {
        "certification": "18+",
        "meaning": "Suitable for ages 18 and over.",
        "order": 4
      }
    ],
    "AR": [
      {
        "certification": "ATP",
        "meaning": "Suitable for all audiences.",
        "order": 1
      },
      {
        "certification": "SAM 13",
        "meaning": "Suitable for ages 13 and up.",
        "order": 2
      },
      {
        "certification": "SAM 16",
        "meaning": "Suitable for ages 16 and up.",
        "order": 3
      },
      {
        "certification": "SAM 18",
        "meaning": "Suitable for ages 18 and up.",
        "order": 4
      }
    ],
    "PL": [
      {
        "certification": "0",
        "meaning": "Positive or neutral view of the world, little to no violence, non-sexual love, and no sexual content.",
        "order": 1
      },
      {
        "certification": "7",
        "meaning": "As above; may additionally contain some mild language, bloodless violence, and a more negative view of the world.",
        "order": 2
      },
      {
        "certification": "12",
        "meaning": "May contain some foul language, some violence, and some sexual content.",
        "order": 3
      },
      {
        "certification": "16",
        "meaning": "Deviant social behaviour, world filled with violence and sexuality, simplified picture of adulthood, display of physical force, especially in controversial social context (against or by parents, teachers, etc.), immoral behaviour without ethic dilemma, putting the blame on the victim, excessive concentration on material possessions.",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "One-sided display of the joys of adult life without showing responsibilities (e.g. work), social justification of violent behaviour, excessive vulgarity, use of racial slurs and social stereotypes, explicit sexual content, praise of aggression or vulgarity, access to these programs is locked by a personal password.",
        "order": 5
      }
    ],
    "MA": [
      {
        "certification": "NR",
        "meaning": "All audiences.",
        "order": 0
      },
      {
        "certification": "10",
        "meaning": "Not recommended for under 10.",
        "order": 1
      },
      {
        "certification": "12",
        "meaning": "Not recommended for under 12.",
        "order": 2
      },
      {
        "certification": "16",
        "meaning": "Not recommended for under 16.",
        "order": 3
      }
    ],
    "GR": [
      {
        "certification": "K",
        "meaning": "Suitable for all ages.",
        "order": 1
      },
      {
        "certification": "8",
        "meaning": "Suitable for ages 8 and up (allowed only 30 minutes after the kid-friendly zone).",
        "order": 2
      },
      {
        "certification": "12",
        "meaning": "Suitable for ages 12 and up (allowed only between 9:30 p.m. and 6:00 a.m., or between 10:00 p.m. and 6:00 a.m. during Fridays, Saturdays and school holidays).",
        "order": 3
      },
      {
        "certification": "16",
        "meaning": "Suitable for ages 16 and up (allowed only between 11:00 p.m. and 6:00 a.m.).",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "Suitable for ages 18 and up (allowed only between 1:00 a.m. and 6:00 a.m.).",
        "order": 5
      }
    ],
    "IL": [
      {
        "certification": "E",
        "meaning": "Exempt from classification. This rating is usually applied to live broadcasts.",
        "order": 1
      },
      {
        "certification": "G",
        "meaning": "General Audiences. Anyone, regardless of age, can watch the programme.",
        "order": 1
      },
      {
        "certification": "12+",
        "meaning": "Suitable for children 12 and over only.",
        "order": 2
      },
      {
        "certification": "15+",
        "meaning": "Suitable for teens 15 and over only.",
        "order": 3
      },
      {
        "certification": "18+",
        "meaning": "Suitable for adults 18 and over only.",
        "order": 4
      }
    ],
    "TW": [
      {
        "certification": "0+",
        "meaning": "Suitable for watching by general audiences.",
        "order": 1
      },
      {
        "certification": "6+",
        "meaning": "Not suitable for viewing by children under the age of six; children over six and under the age of twelve can view if accompanied by parents, teacher or an adult relative.",
        "order": 2
      },
      {
        "certification": "12+",
        "meaning": "Not suitable for viewing by children under the age of twelve, split from the former rating Parental Guidance.",
        "order": 3
      },
      {
        "certification": "15+",
        "meaning": "Not suitable for viewing by people under the age of fifteen, split from the former rating Parental Guidance.",
        "order": 4
      },
      {
        "certification": "18+",
        "meaning": "Not suitable for viewing by people under the age of eighteen.",
        "order": 4
      }
    ],
    "ZA": [
      {
        "certification": "All",
        "meaning": "This is a programme/film that does not contain any obscenity, and is suitable for family viewing. A logo must be displayed in the corner of the screen for 30 seconds after each commercial break.",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "Children under 6 may watch this programme/film, but must be accompanied by an adult. This program contains an adult related theme, which might include very mild language, violence and sexual innuendo. A logo must be displayed in the corner of the screen for one minute after each commercial break.",
        "order": 2
      },
      {
        "certification": "13",
        "meaning": "Children under 13 are prohibited from watching this programme/film. This programme contains mild language, violence and sexual innuendo. A logo must be displayed in the corner of the screen for two minutes after each commercial break.",
        "order": 3
      },
      {
        "certification": "16",
        "meaning": "Children under 16 are prohibited from watching this programme/film. It contains moderate violence, language, and some sexual situations. In the case of television, this programme may only be broadcast after 9pm–4:30am. A logo must be displayed in the corner of the screen for five minutes after each commercial break. A full-screen warning must be issued before the start of the programme. If the programme is longer than an hour, a warning must be displayed every half an hour.",
        "order": 4
      },
      {
        "certification": "18",
        "meaning": "Children under 18 are prohibited from watching this programme/film. It contains extreme violence, language and/or graphic sexual content. In the case of television, this program may only be broadcast from 10pm–4:30am. A logo must be displayed in the corner of the screen for the duration of the programme. A full-screen warning must be issued before the start of the programme and after each commercial break.",
        "order": 5
      },
      {
        "certification": "X18",
        "meaning": "This is reserved for films of an extreme sexual nature (pornography). X18 films may only be distributed in the form of video and DVD in a controlled environment (e.g. adult shops). No public viewing of this film may take place. X18 films may not be broadcast on television and in cinemas. This has been breached twice by e.tv, where the softcore (borderline hardcore) Emmanuelle was screened. The X18 rating does not refer to child pornography/child sexual abuse—due to being banned by the Film and Publication Board.",
        "order": 6
      }
    ],
    "SG": [
      {
        "certification": "G",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "PG",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "PG13",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "NC16",
        "meaning": "",
        "order": 4
      },
      {
        "certification": "M18",
        "meaning": "",
        "order": 5
      },
      {
        "certification": "R21",
        "meaning": "Suitable for adults aged 21 and above.",
        "order": 6
      }
    ],
    "PR": [
      {
        "certification": "NR",
        "meaning": "",
        "order": 0
      },
      {
        "certification": "TV-MA",
        "meaning": "",
        "order": 6
      },
      {
        "certification": "TV-Y",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "TV-Y7",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "TV-G",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "TV-PG",
        "meaning": "",
        "order": 4
      },
      {
        "certification": "TV-14",
        "meaning": "",
        "order": 5
      }
    ],
    "VI": [
      {
        "certification": "NR",
        "meaning": "",
        "order": 0
      },
      {
        "certification": "TV-Y",
        "meaning": "",
        "order": 1
      },
      {
        "certification": "TV-Y7",
        "meaning": "",
        "order": 2
      },
      {
        "certification": "TV-G",
        "meaning": "",
        "order": 3
      },
      {
        "certification": "TV-PG",
        "meaning": "",
        "order": 4
      },
      {
        "certification": "TV-14",
        "meaning": "",
        "order": 5
      },
      {
        "certification": "TV-MA",
        "meaning": "",
        "order": 6
      }
    ]
  };

export default router;