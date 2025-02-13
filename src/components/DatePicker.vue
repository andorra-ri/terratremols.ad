<template>
  <div class="datepicker">
    <input
      :value="selected ? props.format(selected) : undefined"
      :placeholder="props.placeholder"
      :size="size"
      type="text"
      readonly>
    <div :class="['calendar', { disabled }]">
      <header>
        <a href="#" class="prevYear" @click.prevent="prevYear" />
        <a href="#" class="prevMonth" @click.prevent="prevMonth" />
        <label>{{ monthFormatter.format(cursor) }} {{ cursorYear }}</label>
        <a href="#" class="nextMonth" @click.prevent="nextMonth" />
        <a href="#" class="nextYear" @click.prevent="nextYear" />
        <!-- <a href="#" @click.prevent="nextMonth" /> -->
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
  locale: 'en',
  notBefore: undefined,
  notAfter: undefined,
  invalid: undefined,
  valid: undefined,
  placeholder: 'Select date',
  format: (date: Date) => date.toLocaleDateString(),
});

const selected = defineModel<Date | undefined>({ required: true });

const emit = defineEmits<{
  select: [date: Date | undefined];
}>();

const today = new Date();
const weekdayFormatter = new Intl.DateTimeFormat(props.locale, { weekday: 'short' });
const monthFormatter = new Intl.DateTimeFormat(props.locale, { month: 'long' });

const cursor = ref(startOfMonth(selected.value || new Date()));
// Update cursor if date changed externally
watch(selected, date => { cursor.value = date || new Date(); });

const cursorYear = computed({
  get: () => cursor.value.getFullYear(),
  set: year => cursor.value.setFullYear(year),
});

const prevMonth = () => { cursor.value = add(cursor.value, { months: -1 }); };
const prevYear = () => {cursor.value = add(cursor.value, { years: -1 })};
const nextMonth = () => { cursor.value = add(cursor.value,  { months: 1 }); };
const nextYear = () => { cursor.value = add(cursor.value, {years: 1})};

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
      'day--selected': !!selected.value && isSameDay(date, selected.value),
      'day--today': isSameDay(date, today),
    }];
    return { date, label, disabled, classes };
  });
});

const select = (day: Day) => {
  if (!day.disabled) {
    selected.value = day.date;
    emit('select', selected.value);
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
      padding: 0.2rem 0.2rem;
      animation: none;

      &.prevYear, &.prevMonth, &.nextYear, &.nextMonth {
        content: '';
        width: 3px;
        height: 3px;
      }

      &.prevYear, &.nextYear {
        border-top: 4px double black;
        border-left: 4px double black;
      }

      &.prevMonth, &.nextMonth {
        border-top: 2px solid black;
        border-left: 2px solid black;
      }

      &.prevYear, &.prevMonth{
        transform: rotate(-45deg);
      }

      &.nextYear, &.nextMonth{
        transform: rotate(135deg);
      }
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