<template>
  <div class="datepicker">
    <input
      :value="props.modelValue ? props.format(props.modelValue) : undefined"
      :placeholder="props.placeholder"
      :size="size"
      type="text"
      readonly>
    <div :class="['calendar', { disabled }]">
      <header>
        <a href="#" class="prev" @click.prevent="prevMonth" />
        <label>{{ monthFormatter.format(cursor) }} {{ cursorYear }}</label>
        <a href="#" class="next" @click.prevent="nextMonth" />
      </header>
      <ul class="days">
        <li v-for="day in weekdayLabels" :key="day" class="weekdays">{{ day }}</li>
        <li
          v-for="day in days"
          :key="day.date.toISOString()"
          :class="day.classes"
          @click="select(day)">
          <slot :day="day">{{ day.label }}</slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  add,
  startOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isAfter,
  isBefore,
  isWithinInterval,
} from 'date-fns';

type DatesList = (string | Date | (string | Date)[])[];

type Day = {
  date: Date;
  label: number;
  disabled: boolean;
  classes: (string | Record<string, boolean>)[];
};

type Props = {
  modelValue?: Date;
  disabled?: boolean;
  notBefore?: string | Date;
  notAfter?: string | Date;
  invalid?: DatesList;
  valid?: DatesList;
  locale?: string;
  format?: (date: Date) => string;
  placeholder?: string;
  size: number;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  locale: 'en',
  notBefore: undefined,
  notAfter: undefined,
  invalid: undefined,
  valid: undefined,
  placeholder: 'Select date',
  format: (date: Date) => date.toLocaleDateString(),
});

const emit = defineEmits(['update:modelValue', 'select']);

const today = new Date();
const weekdayFormatter = new Intl.DateTimeFormat(props.locale, { weekday: 'short' });
const monthFormatter = new Intl.DateTimeFormat(props.locale, { month: 'long' });

const cursor = ref(startOfMonth(props.modelValue || new Date()));
// Update cursor if date changed externally
watch(() => props.modelValue, date => {
  cursor.value = date || new Date();
});

const cursorYear = computed({
  get: () => cursor.value.getFullYear(),
  set: year => cursor.value.setFullYear(year),
});

const prevMonth = () => { cursor.value = add(cursor.value, { months: -1 }); };
const nextMonth = () => { cursor.value = add(cursor.value, { months: 1 }); };

const weekdayLabels = eachDayOfInterval({
  start: startOfWeek(cursor.value, { weekStartsOn: 1 }),
  end: endOfWeek(cursor.value, { weekStartsOn: 1 }),
}).map(day => weekdayFormatter.format(day));

const isDisabled = (date: Date) => {
  const { notBefore, notAfter, invalid, valid } = props;
  const isLate = notAfter ? isAfter(date, startOfDay(new Date(notAfter))) : false;
  const isEarly = notBefore ? isBefore(date, startOfDay(new Date(notBefore))) : false;
  const matchDates = (range: DatesList) => range.some(dates => {
    if (!Array.isArray(dates)) return isSameDay(date, new Date(dates));
    return isWithinInterval(date, {
      start: startOfDay(new Date(dates[0])),
      end: startOfDay(new Date(dates[1])),
    });
  });
  const inInvalidRange = matchDates(invalid || []);
  const inValidRange = props.valid ? matchDates(valid || []) : true;
  return isLate || isEarly || inInvalidRange || !inValidRange;
};

const days = computed<Day[]>(() => {
  const start = startOfWeek(startOfMonth(cursor.value), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(cursor.value), { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end }).map(date => {
    const label = date.getDate();
    const disabled = isDisabled(date);
    const classes = ['day', {
      'day--disabled': disabled,
      'day--outsider': !isSameMonth(date, cursor.value),
      'day--selected': !!props.modelValue && isSameDay(date, props.modelValue),
      'day--today': isSameDay(date, today),
    }];
    return { date, label, disabled, classes };
  });
});

const select = (day: Day) => {
  if (!day.disabled) {
    const value = Array.isArray(props.modelValue)
      ? [props.modelValue[1], day.date]
      : day.date;
    emit('update:modelValue', value);
    emit('select', value);
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  header {
    display: flex;
    align-items: center;

    label {
      flex: 1;
      text-align: center;
    }

    a {
      color: inherit;
      padding: 0.5rem 0.75rem;
      animation: none;

      &::before {
        display: block;
        content: '';
        height: var(--datepicker-chevron-size, 5px);
        width: var(--datepicker-chevron-size, 5px);
        border: 1px solid currentcolor;
        border-width: 2px 2px 0 0;
        transform: rotate(45deg);
      }

      &.prev::before { transform: rotate(-135deg); }
    }
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    list-style: none;
  }

  .day {
    text-align: center;
    position: relative;
    cursor: pointer;

    &--disabled { cursor: not-allowed; }
  }
}
</style>
