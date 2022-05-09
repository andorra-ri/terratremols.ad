<template>
  <div class="datepicker">
    <input
      :value="format(modelValue)"
      :placeholder="placeholder"
      :size="size"
      type="text"
      readonly>
    <div :class="['calendar', { disabled }]">
      <header>
        <a href="#" class="prev" @click.prevent="prevMonth" />
        <label>{{ monthLabel }}</label>
        <a href="#" class="next" @click.prevent="nextMonth" />
      </header>
      <ul class="days">
        <li v-for="day in weekdayLabels" :key="day" class="weekdays">{{ day }}</li>
        <li
          v-for="day in days"
          :key="day.date"
          :class="day.classes"
          @click="select(day)">
          <slot :day="day">{{ day.label }}</slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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

export default {
  name: 'DatePicker',
  props: {
    modelValue: { type: Date, default: undefined },
    disabled: { type: Boolean, default: false },
    notBefore: { type: [String, Date], default: null },
    notAfter: { type: [String, Date], default: null },
    valid: { type: Array, default: null },
    default: { type: Date, default: new Date() },
    locale: { type: String, default: 'en' },
    format: { type: Function, default: date => date },
    placeholder: { type: String, default: 'Select a date' },
    size: { type: [String, Number], default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const cursor = ref(startOfMonth(props.modelValue || props.default));

    const prevMonth = () => { cursor.value = add(cursor.value, { months: -1 }); };
    const nextMonth = () => { cursor.value = add(cursor.value, { months: 1 }); };

    const weekdayLabels = eachDayOfInterval({
      start: startOfWeek(cursor.value, { weekStartsOn: 1 }),
      end: endOfWeek(cursor.value, { weekStartsOn: 1 }),
    }).map(day => new Intl.DateTimeFormat(props.locale, { weekday: 'short' }).format(day));

    const monthLabel = computed(() => {
      const options = { year: 'numeric', month: 'long' };
      const dtf = new Intl.DateTimeFormat(props.locale, options);
      return dtf.format(cursor.value);
    });

    // Update cursor if date changed externally
    watch(() => props.modelValue, date => {
      if (date) cursor.value = date;
    });

    const select = day => {
      if (!day.disabled) {
        emit('update:modelValue', day.date);
        cursor.value = day.date;
      }
    };

    const isDisabled = date => {
      const { notBefore, notAfter, invalid, valid } = props;
      const isLate = notAfter ? isAfter(date, startOfDay(new Date(notAfter))) : false;
      const isEarly = notBefore ? isBefore(date, startOfDay(new Date(notBefore))) : false;
      const matchDates = range => range.some(dates => (Array.isArray(dates)
        ? isWithinInterval(date, {
          start: startOfDay(new Date(dates[0])),
          end: startOfDay(new Date(dates[1])),
        })
        : isSameDay(date, new Date(dates))
      ));
      const inInvalidRange = matchDates(invalid || []);
      const inValidRange = props.valid ? matchDates(valid || []) : true;
      return isLate || isEarly || inInvalidRange || !inValidRange;
    };

    const days = computed(() => {
      const start = startOfWeek(startOfMonth(cursor.value), { weekStartsOn: 1 });
      const end = endOfWeek(endOfMonth(cursor.value), { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end }).map(date => {
        const label = date.getDate();
        const disabled = isDisabled(date);
        const classes = ['day', {
          'day--selected': isSameDay(date, props.modelValue),
          'day--outsider': !isSameMonth(date, cursor.value),
          'day--disabled': disabled,
        }];
        return { date, label, disabled, classes };
      });
    });

    return { days, prevMonth, nextMonth, select, monthLabel, weekdayLabels };
  },
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
        border: 1px solid currentColor;
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
