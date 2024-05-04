import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { usePhoneStore } from './phone-store'

export default function PhoneOpenButton() {
	const setIsOpen = usePhoneStore((state) => state.setIsOpen)

	return (
		<button type="button" className="group relative w-[80px]" onMouseUp={() => setIsOpen(true)}>
			<Sprite
				data={{
					part: '1',
					m: SPRITESHEET_DATA.frames['frame-btn-02.png'].frame,
				}}
				className="w-full"
			/>

			<div className="-translate-x-1/2 absolute inset-0 top-3 left-1/2 w-[60px] transition-transform duration-200 ease-[cubic-bezier(0,0.71,0.2,1.01)] group-hover:translate-y-[-20px] group-hover:scale-105">
				<Sprite
					data={{
						part: '1',
						m: SPRITESHEET_DATA.frames['icon-phone.png'].frame,
					}}
					className="w-full"
				/>
			</div>
			<span className="-translate-x-1/2 absolute bottom-[22px] left-1/2 text-[#CBAB79] text-sm opacity-0 transition-opacity ease-in-out group-hover:opacity-100">
				Phone
			</span>

			<div className="-left-8 absolute top-[30px] hidden animate-shake-horizontal group-hover:block">
				<Sprite
					data={{
						part: '1',
						m: SPRITESHEET_DATA.frames['icon-arrow-01.png'].frame,
					}}
					className="w-5 rotate-180"
				/>
			</div>
		</button>
	)
}
