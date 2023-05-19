import { json } from '@sveltejs/kit'
import { series } from '$db/series'

/**
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 */

export const GET = async () => {
	try {
		const response = await series.insertMany([
			{
				_id: '63eace7e768bfaf6c791aa1c',
				name: 'Romulus',
				poster: 'https://image.tmdb.org/t/p/w500//vJTuJmlclr0dlv8BdN0ykLGd9hh.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa1d',
				name: 'Barbarians',
				poster: 'https://image.tmdb.org/t/p/w500//r3cUaeLUGT8c0YIR8qCDDH2iJSU.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa1e',
				name: 'See',
				poster: 'https://image.tmdb.org/t/p/w500//1kZdBrH1C07Zf2131QUpmju3kO6.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa1f',
				name: 'You',
				poster: 'https://image.tmdb.org/t/p/w500//7bEYwjUvlJW7GerM8GYmqwl4oS3.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa20',
				name: 'Vikings',
				poster: 'https://image.tmdb.org/t/p/w500//bQLrHIRNEkE3PdIWQrZHynQZazu.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa21',
				name: 'Game Of Thrones',
				poster: 'https://image.tmdb.org/t/p/w500//7WUHnWGx5OO145IRxPDUkQSh4C7.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa22',
				name: 'Viking Valhalla',
				poster: 'https://image.tmdb.org/t/p/w500//rDFy1fUU6OC3Mm0CLFB7u0fGwVN.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa23',
				name: 'Squid Game',
				poster: 'https://image.tmdb.org/t/p/w500//dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa24',
				name: 'Alice In Borderland',
				poster: 'https://image.tmdb.org/t/p/w500//uFXEoVPENgKJrkxFWlOhNMDwlEk.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa25',
				name: 'The Peripheral',
				poster: 'https://image.tmdb.org/t/p/w500//2e5NNQu9B1fXBNllRj8fzysCguP.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa26',
				name: 'Bodyguard',
				poster: 'https://image.tmdb.org/t/p/w500//5DUJTrHTRLHLCKWriPhdusQogAv.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa27',
				name: 'Lucifer',
				poster: 'https://image.tmdb.org/t/p/w500//ekZobS8isE6mA53RAiGDG93hBxL.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa28',
				name: 'Wednesday',
				poster: 'https://image.tmdb.org/t/p/w500//9PFonBhy4cQy7Jz20NpMygczOkv.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa29',
				name: 'Locke & Key',
				poster: 'https://image.tmdb.org/t/p/w500//zuxGfRKziGHPogipnEXXykdDmyT.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa2a',
				name: 'Dark',
				poster: 'https://image.tmdb.org/t/p/w500//7yQyDCqSazrYTnmxdQLAZ8YDH87.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa2b',
				name: '1899',
				poster: 'https://image.tmdb.org/t/p/w500//gZleGu1MQVBArH2dlpZ9CGi0hhy.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa2c',
				name: 'The Order',
				poster: 'https://image.tmdb.org/t/p/w500//x8vDUOvladgjJo8sdNpRelm4lSC.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa2d',
				name: 'The King: Eternal Monarch',
				poster: 'https://image.tmdb.org/t/p/w500//7SLlbkzOJb8v9wXVYIcqozx2hxe.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa2e',
				name: 'Gangs Of London',
				poster: 'https://image.tmdb.org/t/p/w500//9MJC2IPHrdJ7Nr2lceNZepgmRrr.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa2f',
				name: 'ZeroZeroZero',
				poster: 'https://image.tmdb.org/t/p/w500//c0AISx9tx6crOih0KdjQsfAm3Uo.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa30',
				name: 'Upload',
				poster: 'https://image.tmdb.org/t/p/w500//jVtYbiDDQljYv1uAagXfNjKe9pF.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa31',
				name: 'Elite',
				poster: 'https://image.tmdb.org/t/p/w500//3NTAbAiao4JLzFQw6YxP1YZppM8.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa32',
				name: 'Sex Education',
				poster: 'https://image.tmdb.org/t/p/w500//8j12tohv1NBZNmpU93f47sAKBbw.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa33',
				name: 'Outer Banks',
				poster: 'https://image.tmdb.org/t/p/w500//ovDgO2LPfwdVRfvScAqo9aMiIW.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa34',
				name: 'Warrior Nun',
				poster: 'https://image.tmdb.org/t/p/w500//fLP0mA7FiERZhDP1NJUaHpm6XM8.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa35',
				name: 'The Lord Of Rings: The Rings Of Power',
				poster: 'https://image.tmdb.org/t/p/w500//mYLOqiStMxDK3fYZFirgrMt8z5d.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa36',
				name: 'House Of The Dragon',
				poster: 'https://image.tmdb.org/t/p/w500//1X4h40fcB4WWUmIBK0auT4zRBAV.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa37',
				name: 'The Great Heist',
				poster: 'https://image.tmdb.org/t/p/w500//j52EFofX8hCoenmvDC4AOppoPWu.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa38',
				name: 'The Sandman',
				poster: 'https://image.tmdb.org/t/p/w500//q54qEgagGOYCq5D1903eBVMNkbo.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa39',
				name: 'I Am Groot',
				poster: 'https://image.tmdb.org/t/p/w500//i1DbrUSnPmdvChjyTXgqlOTG9be.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa3a',
				name: 'Resident Evil',
				poster: 'https://image.tmdb.org/t/p/w500//rmLvn4w4HMdxobPkjmIqrhJiXDO.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa3b',
				name: 'Love 101',
				poster: 'https://image.tmdb.org/t/p/w500//4OOhHLZeTtNji4V6ZRYHQSvjlZc.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa3c',
				name: 'Ms.Marvel',
				poster: 'https://image.tmdb.org/t/p/w500//ls2Hl8CXmqEHvkDqkN3fRtmDodK.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa3d',
				name: 'Stranger Things',
				poster: 'https://image.tmdb.org/t/p/w500//49WJfeN0moxb9IPfGn8AIqMGskD.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa3e',
				name: 'Man Vs Bee',
				poster: 'https://image.tmdb.org/t/p/w500//74kkM7E5IymHl7ZS4XugP6YT3zU.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa3f',
				name: 'The Wheel Of Time',
				poster: 'https://image.tmdb.org/t/p/w500//mpgDeLhl8HbhI03XLB7iKO6M6JE.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa40',
				name: 'The Time Travelers Wife',
				poster: 'https://image.tmdb.org/t/p/w500//m7gKiAdNHf0uLkZAdgWgLGrPtll.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa41',
				name: 'The Last Kingdom',
				poster: 'https://image.tmdb.org/t/p/w500//8eJf0hxgIhE6QSxbtuNCekTddy1.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa42',
				name: 'Prehistoric Planet',
				poster: 'https://image.tmdb.org/t/p/w500//yMdFsHKp4YX2CUkAQcZswxXDuoe.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa43',
				name: 'Cracow Monsters',
				poster: 'https://image.tmdb.org/t/p/w500//acsp3Bm3cSlQtUGDWNmSFgp4Tzl.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa44',
				name: 'Moon Knight',
				poster: 'https://image.tmdb.org/t/p/w500//YksR65as1ppF2N48TJAh2PLamX.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa45',
				name: 'Euphoria',
				poster: 'https://image.tmdb.org/t/p/w500//jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa46',
				name: 'Raised By Wolves',
				poster: 'https://image.tmdb.org/t/p/w500//f6Xg4mTARZi2YDqAh3WwZuebcHO.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa47',
				name: 'Biohackers',
				poster: 'https://image.tmdb.org/t/p/w500//tiSfiW5ySMm8vHba8s3GfoIBSen.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa48',
				name: 'Peacemaker',
				poster: 'https://image.tmdb.org/t/p/w500//hE3LRZAY84fG19a18pzpkZERjTE.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa49',
				name: 'Hellbound',
				poster: 'https://image.tmdb.org/t/p/w500//5NYdSAnDVIXePrSG2dznHdiibMk.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa4a',
				name: 'The Witcher',
				poster: 'https://image.tmdb.org/t/p/w500//7vjaCdMw15FEbXyLQTVa04URsPm.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa4b',
				name: 'Mayfair Witches',
				poster: 'https://image.tmdb.org/t/p/w500//zKRBfuRWGbs9R2nxhlNP8CfArUh.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa4c',
				name: 'Foundation',
				poster: 'https://image.tmdb.org/t/p/w500//A1fXGFxDifQzj08OlaGTVcnXHyd.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa4d',
				name: 'La Casa De Papel',
				poster: 'https://image.tmdb.org/t/p/w500//reEMJA1uzscCbkpeRJeTT2bjqUp.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa4e',
				name: 'Taboo',
				poster: 'https://image.tmdb.org/t/p/w500//om1wVOuEtwH3krHutIWO9sJzkS5.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa4f',
				name: 'Tiny World',
				poster: 'https://image.tmdb.org/t/p/w500//cuU2GbEwRiOYDKMeHj4kmVgUogt.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa50',
				name: 'Ragnarok',
				poster: 'https://image.tmdb.org/t/p/w500//xUtOM1QO4r8w8yeE00QvBdq58N5.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa51',
				name: 'The Mandalorian',
				poster: 'https://image.tmdb.org/t/p/w500//sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa52',
				name: 'The Last Of Us',
				poster: 'https://image.tmdb.org/t/p/w500//uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa53',
				name: 'His Dark Materials',
				poster: 'https://image.tmdb.org/t/p/w500//1ljcoM9hFNiXpcoevZQwwc7oCYT.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa54',
				name: 'Altered Carbon',
				poster: 'https://image.tmdb.org/t/p/w500//95IsiH4p5937YXQHaOS2W2dWYOG.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa55',
				name: 'Swamp Things',
				poster: 'https://image.tmdb.org/t/p/w500//wfMuTZ2SzDMmg4hat55Cb1Gqj3T.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa56',
				name: 'Sophia',
				poster: 'https://image.tmdb.org/t/p/w500//zTEfkCigvnGb2HtSIwhihNJ3bZs.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa57',
				name: 'Impulse',
				poster: 'https://image.tmdb.org/t/p/w500//sMZMj1gCDZA9eZzHpEmDMpQ0Iur.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa58',
				name: '8 Days',
				poster: 'https://image.tmdb.org/t/p/w500//6XVLB9v03Y7XqprBF47zkNryK5r.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa59',
				name: 'White Lines',
				poster: 'https://image.tmdb.org/t/p/w500//3O1lB4ZhTMZ0Q3VsU7SHtFBDYI1.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa5a',
				name: 'Curon',
				poster: 'https://image.tmdb.org/t/p/w500//vmNpI4C0LDfWGiSYWyKLVkCSaOi.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa5b',
				name: 'Killing Eve',
				poster: 'https://image.tmdb.org/t/p/w500//4wKhTVw8aGq5AZMa0Q1spERdi7n.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa5c',
				name: 'Control Z',
				poster: 'https://image.tmdb.org/t/p/w500//ibS3YQH5jTQZnQ4WNrExkCcHJCq.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa5d',
				name: 'Caliphate',
				poster: 'https://image.tmdb.org/t/p/w500//pkROJ1GSQ2fVJIFOOdk2IaxJ1v2.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa5e',
				name: 'Chambers',
				poster: 'https://image.tmdb.org/t/p/w500//h6jgj9zwwdyxIEsmWwkQHHdfEJ6.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa5f',
				name: 'Sweet Tooth',
				poster: 'https://image.tmdb.org/t/p/w500//zIzynKFGLUpCAj3h0zahSL6nZ3M.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa60',
				name: 'Amazing Stories',
				poster: 'https://image.tmdb.org/t/p/w500//evcvXE6BP8fT8UoWsyiTBvxqyrL.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa61',
				name: 'Protector',
				poster: 'https://image.tmdb.org/t/p/w500//xoN4wJRzeaWBfuQDYPngJgN6y9t.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa62',
				name: 'Bloodride',
				poster: 'https://image.tmdb.org/t/p/w500//tYhbw1wAgSy0bTATlAw4OgfG0Ly.jpg'
			},
			{
				_id: '63eace7e768bfaf6c791aa63',
				name: 'I Am Not Okay With This',
				poster: 'https://image.tmdb.org/t/p/w500//kf3yX0ILNlLJ42X3lX2iYJ3QRp6.jpg'
			},
			{
				_id: '63eaced9768bfaf6c791aa64',
				name: 'The Good Doctor',
				poster: 'https://image.tmdb.org/t/p/w500//luhKkdD80qe62fwop6sdrXK9jUT.jpg'
			},
			{
				_id: '63ead4c2254a5ff80ef8c5fb',
				name: 'Servant',
				poster: 'https://image.tmdb.org/t/p/w500//plsSSobmPSSz4hm8vYMXeIVkJJP.jpg'
			},
			{
				_id: '63eadf0c254a5ff80ef8c5fc',
				name: 'Kaleidoscope',
				poster: 'https://image.tmdb.org/t/p/w500//2nXJoSB5Y6R9ne7pjqL7Cs3zqY1.jpg'
			},
			{
				_id: '63eb92f2254a5ff80ef8c5fd',
				name: 'Mr. Robot',
				poster: 'https://image.tmdb.org/t/p/w500//oKIBhzZzDX07SoE2bOLhq2EE8rf.jpg'
			},
			{
				_id: '63eb9c6bad129f67c7268888',
				name: 'Seven Worlds, One Planet',
				poster: 'https://image.tmdb.org/t/p/w500//kzKNMIlqyznC1jjht8mI2oEtDcp.jpg'
			},
			{
				_id: '63eb9ca6ad129f67c7268889',
				name: 'The Planets',
				poster: 'https://image.tmdb.org/t/p/w500//oA0MnA2KMbWIWM03Jis0t8oCdW0.jpg'
			},
			{
				_id: '63ef885aad129f67c726888a',
				name: 'Cukur',
				poster: 'https://ee.e3sk.net/wp-content/uploads/2020/05/مسلسل-الحفرة.jpg'
			},
			{
				_id: '63ef99f7cc48a02cfe272ec9',
				name: 'Crash',
				poster: 'https://image.tmdb.org/t/p/w500//nnC6rX59DdIRxOq5fnvAX8xJP6V.jpg'
			},
			{
				_id: '63f0ca3acc48a02cfe272eca',
				name: 'Wolf Pack',
				poster: 'https://image.tmdb.org/t/p/w500//rbCANmS1ogweUkIBghP03EHtdHB.jpg'
			},
			{
				_id: '63f21eeacc48a02cfe272ecb',
				name: 'The Terminal List',
				poster: 'https://image.tmdb.org/t/p/w500//71f3JHlJCP6V7LhHHiKZgjtFxZw.jpg'
			},
			{
				_id: '6404d9f8cc48a02cfe272ecd',
				name: 'Behind Her Eyes',
				poster: 'https://image.tmdb.org/t/p/w500//sfd90NIf778KoBFmpdBTow4xTm7.jpg'
			},
			{
				_id: '643f0b08578b0eb026e1ea83',
				name: 'Attack On Titan',
				poster: 'https://image.tmdb.org/t/p/w500/cATsDNYK2AMAKh8w9xYLi9wrVti.jpg'
			}
		])

		return json({
			status: 200,
			error: false,
			response
		})
	} catch (error) {
		return json({
			status: 200,
			error: true,
			message: error.message
		})
	}
}
