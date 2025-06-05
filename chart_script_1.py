import plotly.graph_objects as go
import plotly.io as pio

# Data for the deployment comparison
platforms = ["Netlify", "Vercel", "GitHub Pages", "Docker", "VPS/Server"]
setup_difficulty = [1, 1, 2, 3, 4]
monthly_cost = [1, 1, 1, 2, 3]
overall_score = [5, 5, 4, 4, 3]

# Create the horizontal bar chart
fig = go.Figure()

# Add bars for each metric
fig.add_trace(go.Bar(
    name='Setup Diff.',
    y=platforms,
    x=setup_difficulty,
    orientation='h',
    marker_color='#1FB8CD',
    cliponaxis=False
))

fig.add_trace(go.Bar(
    name='Monthly Cost',
    y=platforms,
    x=monthly_cost,
    orientation='h',
    marker_color='#FFC185',
    cliponaxis=False
))

fig.add_trace(go.Bar(
    name='Overall Score',
    y=platforms,
    x=overall_score,
    orientation='h',
    marker_color='#ECEBD5',
    cliponaxis=False
))

# Update layout
fig.update_layout(
    title='React Kanban Deploy Comparison',
    xaxis_title='Rating (1-5)',
    yaxis_title='Platform',
    barmode='group',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update axes
fig.update_xaxes(range=[0, 5.5])
fig.update_yaxes(categoryorder='array', categoryarray=platforms[::-1])

# Save the chart
fig.write_image("react_kanban_deployment_comparison.png")