import operator
from typing import TypedDict, Annotated, List, Optional

class EmergencyState(TypedDict):
    messages: Annotated[List[dict], operator.add]
    emergency_type: Optional[str]
    active_agent: str
    status: str
