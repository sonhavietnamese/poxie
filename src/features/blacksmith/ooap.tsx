import SapidaeT from '@/components/sapidae/sapidae'
import SapidaeNotation, { type SapidaeEmote } from '@/components/sapidae/sapidae-notation'
import { useGuideLineStore } from '@/features/guide-line/guide-line-store'
import { Billboard, Text } from '@react-three/drei'
import { CapsuleCollider, type CollisionPayload, RigidBody, type RigidBodyProps } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { useNpcStore } from '../npc/npc-store'

type BimyProps = {} & RigidBodyProps

export default function Ooap({ ...props }: BimyProps) {
	const [emotion, setEmotion] = useState<SapidaeEmote>('normal')
	const meetNpc = useNpcStore((s) => s.meetNpc)
	const setTarget = useGuideLineStore((s) => s.setTarget)

	const doLerp = useRef(false)

	const onEnter = (e: CollisionPayload) => {
		if (e.colliderObject?.name === 'character-body') {
			setTarget(null)
			setEmotion('question')
			meetNpc('ooap')
			doLerp.current = true
		}
	}

	const onExit = (e: CollisionPayload) => {
		if (e.colliderObject?.name === 'character-body') {
			setEmotion('normal')
			meetNpc(undefined)

			doLerp.current = false
		}
	}

	return (
		<RigidBody {...props} type="fixed" colliders={false}>
			<CapsuleCollider sensor args={[1, 2.3]} onIntersectionEnter={onEnter} onCollisionExit={onExit} />

			<SapidaeNotation emote={emotion}>
				<Billboard position={[0, 2.3, 0]}>
					<Text font="Prompt-Black.ttf" color="white" strokeWidth={0.015} strokeColor="#735427" fontSize={0.25}>
						Ooap
					</Text>
				</Billboard>
				<SapidaeT animation="idle-00" />
			</SapidaeNotation>
		</RigidBody>
	)
}
