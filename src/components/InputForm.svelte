<script lang="ts">
	import ButtonGroup from 'flowbite-svelte/ButtonGroup.svelte';
	import Dropdown from 'flowbite-svelte/Dropdown.svelte';
	import DropdownItem from 'flowbite-svelte/DropdownItem.svelte';
	import Temperature from './Temperature.svelte';
	import { ex0, ex1, ex2} from '~/constants/examples';

	import { ArrowRightOutline, ChevronDownOutline } from 'flowbite-svelte-icons';
	import {
		inputText,
		selectedModel,
		modelData,
		isModelRunning,
		temperature,
		predictedToken,
		inputTextExample,
		isFetchingModel,
		expandedBlock,
		selectedExampleIdx,
		tokens,
		isLoaded,
		modelSession
	} from '~/store';
	import { Spinner } from 'flowbite-svelte';
	import LoadingDots from './LoadingDots.svelte';
	import classNames from 'classnames';
	import { tick } from 'svelte';

	let predictRef: HTMLDivElement;

	$: inputTextTemp = $inputText || '';

	$: predictedTokenTemp = $predictedToken?.token || '';

	const wordLimit = 12;
	$: exceedLimit = inputTextTemp.split(' ').length >= wordLimit;

	const handleSubmit = () => {
		inputText.set(inputTextTemp);
	};

	// Example select box
	let dropdownOpen = false;
	const initialDataMap = [ex0, ex1, ex2];
	const onSelectExample = (d, i) => {
		dropdownOpen = false;

		inputTextTemp = d.prompt;
		predictedTokenTemp = d.sampled.token;
		inputText.set(d.prompt);
		selectedExampleIdx.set(i);

		if ($isFetchingModel || !$modelSession) {
			modelData.set(d);
			predictedToken.set(d.sampled);
			tokens.set(d.tokens);
		}
	};

	$: isLoading = $isFetchingModel || $isModelRunning;
	$: disabled = $isFetchingModel || $isModelRunning || $expandedBlock.id !== null;
	$: selectDisabled = $isModelRunning || $expandedBlock.id !== null;
</script>

<svelte:head>
	<meta charset="UTF-8">
</svelte:head>

<div class="input-area" dir="rtl">
	<form class="input-form">
		<ButtonGroup class="input-btn-group" size="sm">
			<button
				type="button"
				disabled={selectDisabled}
				class:selectDisabled
				class="select-button inline-flex shrink-0 items-center justify-center border border-s-0 border-gray-200 bg-white px-3 py-2 text-center text-xs font-medium text-gray-900 first:rounded-s-lg first:border-s last:rounded-e-lg"
			>
				أمثلة<ChevronDownOutline class="pointer-events-none h-4 w-4 text-gray-500" />
			</button>
			<Dropdown placement="bottom-start" bind:open={dropdownOpen} class="example-dropdown">
				{#each initialDataMap as example, index}
					<DropdownItem
						class={$selectedExampleIdx === index && 'active'}
						on:click={() => {
							onSelectExample(example, index);
						}}>{example.prompt}</DropdownItem
					>
				{/each}
			</Dropdown>

			<div
				class="input-container"
				class:disabled
			>
				<div class={`editable ${!$isModelRunning ? 'w-full' : ''}`}>
					<div class="text-display">
						{inputTextTemp}
					</div>
					<div
						bind:this={predictRef}
						class="predicted"
						role="none"
					>
						<span>{predictedTokenTemp}</span>
					</div>
				</div>
				{#if $isModelRunning}
					<div class="loading"><LoadingDots /></div>
				{/if}
				{#if $isLoaded && $isFetchingModel}

				{:else if exceedLimit}
				{/if}
			</div>
		</ButtonGroup>

	</form>
	<Temperature disabled={isLoading} />
</div>

<style lang="scss">
	.input-area {
		width: 100%;
		flex-shrink: 0;
		display: flex;
		gap: 1rem;
		padding-left: 1.25rem;
		padding-right: 1rem;

		.input-form {
			width: 100%;
			flex: 1 0 0;
			display: flex;
			align-items: center;
			gap: 0.5rem;

			:global(.input-btn-group) {
				flex: 1 0 0;
				display: flex;
			}
		}
	}
	.input-container {
		position: relative;
		display: flex;
		flex: 1 0 0;
		align-items: center;

		border: 1px solid theme('colors.gray.300');
		color: theme('colors.gray.900');
		border-right: none;
		border-start-start-radius: 0.5rem;
		border-end-start-radius: 0.5rem;
		font-size: 0.9rem;
		line-height: 1rem;
		padding: 0.5rem;
		white-space: pre-wrap;
		gap: 0.3rem;

		width: 10px; // to keep input box width

		.editable {
			overflow-y: hidden;
			justify-content: start; // for RTL layout

			display: flex;
			align-items: center;
			overflow-x: hidden;
			white-space: nowrap;

			.text-display {
				white-space: nowrap;
			}
			.predicted {
				flex: 1 0 0;
				color: var(--predicted-color);
				font-weight: 600;
				span {
					white-space: pre;
				}
			}
		}

		&.disabled {
			cursor: not-allowed;
		}

		.loading {
			flex-shrink: 0;
		}
	}

	.select-button {
		flex-shrink: 0;
		font-size: 0.8rem;
		border: 1px solid theme('colors.gray.300');
		color: theme('colors.gray.900');
		&:hover {
			background-color: theme('colors.gray.100');
		}
		&:focus {
			outline: none;
		}
		&.disabled {
			cursor: not-allowed;
		}
	}
	:global(.example-dropdown) {
		:global(.active) {
			background-color: theme('colors.gray.100') !important;
		}
	}
	.helper-text {
		position: absolute;
		bottom: 0;
		left: 0; // Changed from right to left for RTL
		padding: 0.3rem 0;
		transform: translate(0, 100%);
		color: theme('colors.gray.400');
		font-size: 0.9rem;
	}
	:global(.generate-button) {
		padding: 0.4rem 0.8rem;
		border: 1px solid theme('colors.gray.300');
		color: theme('colors.gray.900');
		transition: all 0.2s;
		flex-shrink: 0;
	}
	:global(.generate-button.active) {
		&:hover {
			border: 1px solid var(--predicted-color);
			color: var(--predicted-color);
		}
	}
	:global(.generate-button.disabled) {
		opacity: 1;
		background-color: theme('colors.gray.100');
		color: theme('colors.gray.400');
		cursor: not-allowed;
	}

	:global(.generate-button):focus {
		border: 1px solid var(--predicted-color);
		color: var(--predicted-color);
	}
</style>